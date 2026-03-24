import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { page_slug } = await request.json();

    if (!page_slug) {
      return NextResponse.json({ error: 'Missing page_slug' }, { status: 400 });
    }

    const rawSessionCookie = request.cookies.get('dataroom_session')?.value;
    const authCookie = request.cookies.get('dataroom_auth')?.value;

    // Extract session ID from signed cookie (format: "sessionId.signature")
    const sessionId = rawSessionCookie?.includes('.') ? rawSessionCookie.split('.')[0] : rawSessionCookie;

    let effectiveSessionId: string | undefined = sessionId;
    let email: string | null = null;

    if (sessionId) {
      // Look up session to get email and update last_seen
      const session = db.prepare('SELECT id, email, revoked FROM sessions WHERE id = ?').get(sessionId) as {
        id: string;
        email: string;
        revoked: number;
      } | undefined;

      if (session && !session.revoked) {
        email = session.email;
        db.prepare("UPDATE sessions SET last_seen = datetime('now') WHERE id = ?").run(sessionId);
      } else if (session?.revoked) {
        // Session was revoked — tell the client to redirect to login
        return NextResponse.json({ error: 'Session revoked' }, { status: 401 });
      } else {
        effectiveSessionId = undefined;
      }
    }

    if (!effectiveSessionId && authCookie) {
      // Password-only user — create or reuse a synthetic session
      effectiveSessionId = 'password-user';

      const existing = db.prepare('SELECT id FROM sessions WHERE id = ?').get('password-user');
      if (!existing) {
        db.prepare(
          "INSERT INTO sessions (id, name, email, firm) VALUES ('password-user', 'Password User', 'password@gate', NULL)"
        ).run();
      }
      email = 'password@gate';
    }

    if (effectiveSessionId) {
      db.prepare(
        'INSERT INTO page_views (session_id, email, page_slug) VALUES (?, ?, ?)'
      ).run(effectiveSessionId, email, page_slug);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error tracking page view' }, { status: 500 });
  }
}
