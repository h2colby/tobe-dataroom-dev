import { NextRequest, NextResponse } from 'next/server';
import { randomUUID, randomBytes } from 'crypto';
import db from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const { name, email, firm } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const link = db.prepare('SELECT * FROM invite_links WHERE code = ?').get(code) as {
      id: number;
      code: string;
      label: string | null;
      expires_at: string | null;
      max_uses: number | null;
      use_count: number;
      revoked: number;
    } | undefined;

    if (!link) {
      return NextResponse.json({ error: 'Invalid invite link' }, { status: 404 });
    }

    if (link.revoked) {
      return NextResponse.json({ error: 'This link has been revoked' }, { status: 403 });
    }

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This link has expired' }, { status: 403 });
    }

    if (link.max_uses && link.use_count >= link.max_uses) {
      return NextResponse.json({ error: 'This link has reached its usage limit' }, { status: 403 });
    }

    // Increment use count
    db.prepare('UPDATE invite_links SET use_count = use_count + 1 WHERE id = ?').run(link.id);

    // Create session
    const sessionId = randomUUID();
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    db.prepare(
      'INSERT INTO sessions (id, name, email, firm, invite_code, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(sessionId, name, email, firm || null, code, ip, userAgent);

    // Sign the session ID with HMAC so middleware can verify without DB access
    const secret = process.env.SESSION_SECRET || process.env.DATAROOM_PASSWORD || 'investor2026';
    const { createHmac } = await import('crypto');
    const signature = createHmac('sha256', secret).update(sessionId).digest('hex').slice(0, 32);
    const signedSession = `${sessionId}.${signature}`;

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ success: true });
    response.cookies.set('dataroom_session', signedSession, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
