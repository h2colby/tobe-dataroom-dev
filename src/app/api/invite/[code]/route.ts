import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const link = db.prepare('SELECT * FROM invite_links WHERE code = ?').get(code) as {
    id: number;
    code: string;
    label: string | null;
    expires_at: string | null;
    max_uses: number | null;
    use_count: number;
    revoked: number;
    created_at: string;
  } | undefined;

  if (!link) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (link.revoked) {
    return NextResponse.json({ error: 'Link revoked' }, { status: 404 });
  }

  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Link expired' }, { status: 404 });
  }

  if (link.max_uses && link.use_count >= link.max_uses) {
    return NextResponse.json({ error: 'Link exhausted' }, { status: 404 });
  }

  return NextResponse.json({ label: link.label });
}
