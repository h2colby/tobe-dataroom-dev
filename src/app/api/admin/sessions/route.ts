import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const inviteCode = searchParams.get('invite_code');

  let query = `
    SELECT 
      s.*,
      il.label as invite_label,
      (SELECT COUNT(*) FROM page_views pv WHERE pv.session_id = s.id) as page_view_count,
      (SELECT MAX(pv.created_at) FROM page_views pv WHERE pv.session_id = s.id) as last_activity
    FROM sessions s
    LEFT JOIN invite_links il ON il.code = s.invite_code
  `;

  const params: string[] = [];
  if (inviteCode) {
    query += ' WHERE s.invite_code = ?';
    params.push(inviteCode);
  }

  query += ' ORDER BY s.created_at DESC';

  const sessions = db.prepare(query).all(...params);

  return NextResponse.json({ sessions });
}

export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  db.prepare('UPDATE sessions SET revoked = 1 WHERE id = ?').run(id);

  return NextResponse.json({ success: true });
}
