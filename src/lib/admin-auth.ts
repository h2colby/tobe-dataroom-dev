import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tobe2026';

export function generateAdminToken(): string {
  return createHash('sha256').update(`admin:${ADMIN_PASSWORD}:${Date.now()}`).digest('hex').slice(0, 32);
}

// Simple token validation: we store the password hash as the cookie
export function getExpectedAdminToken(): string {
  return createHash('sha256').update(`admin_session:${ADMIN_PASSWORD}`).digest('hex').slice(0, 32);
}

export function checkAdminAuth(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_auth')?.value;
  if (!cookie) return false;
  return cookie === getExpectedAdminToken();
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
