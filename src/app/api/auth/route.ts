import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'dataroom_auth';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function generateToken(password: string): Promise<string> {
  // Must match middleware's generateToken exactly (Web Crypto API for edge compat)
  const encoder = new TextEncoder();
  const data = encoder.encode(`dataroom:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expected = process.env.DATAROOM_PASSWORD || 'investor2026';

    if (password !== expected) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
    }

    const token = await generateToken(expected);
    const isProduction = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
