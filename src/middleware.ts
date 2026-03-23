import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'dataroom_auth';

async function generateToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`dataroom:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for these paths
  const publicPaths = ['/login', '/api/auth', '/_next', '/images', '/logo.svg', '/favicon.ico', '/media', '/docs'];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.DATAROOM_PASSWORD || 'investor2026';
  const validToken = await generateToken(expected);

  if (!token || token !== validToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
