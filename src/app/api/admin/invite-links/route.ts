import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import db from '@/lib/db';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  const links = db.prepare(`
    SELECT 
      il.*,
      (SELECT COUNT(DISTINCT s.id) FROM sessions s WHERE s.invite_code = il.code) as session_count
    FROM invite_links il
    ORDER BY il.created_at DESC
  `).all();

  return NextResponse.json({ links });
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  try {
    const { label, expires_at, max_uses } = await request.json();

    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }

    const code = randomBytes(16).toString('hex');

    const result = db.prepare(
      'INSERT INTO invite_links (code, label, expires_at, max_uses) VALUES (?, ?, ?, ?)'
    ).run(code, label, expires_at || null, max_uses || null);

    const link = db.prepare('SELECT * FROM invite_links WHERE id = ?').get(result.lastInsertRowid);

    // Build the full URL
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const fullUrl = `${protocol}://${host}/join/${code}`;

    return NextResponse.json({ link, url: fullUrl });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  db.prepare('UPDATE invite_links SET revoked = 1 WHERE id = ?').run(id);

  return NextResponse.json({ success: true });
}
