import { NextRequest, NextResponse } from 'next/server';
import { getExpectedAdminToken } from '@/lib/admin-auth';

export const runtime = 'nodejs';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'tobe2026';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = getExpectedAdminToken();
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
