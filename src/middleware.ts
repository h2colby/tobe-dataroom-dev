import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'dataroom_auth';

async function generateToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`dataroom:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

// Verify signed session cookie: "sessionId.signature"
// Signature = HMAC-SHA256(sessionId, secret) — can't be forged without the secret
async function verifySignedSession(cookie: string, secret: string): Promise<boolean> {
  const dotIndex = cookie.lastIndexOf('.');
  if (dotIndex === -1) return false;
  const sessionId = cookie.substring(0, dotIndex);
  const signature = cookie.substring(dotIndex + 1);
  if (!sessionId || !signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(sessionId));
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
  return signature === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for these paths
  const publicPaths = ['/login', '/api/auth', '/_next', '/images', '/logo.svg', '/favicon.ico', '/media', '/docs', '/join', '/api/invite', '/admin', '/api/admin', '/api/track'];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check password gate cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.DATAROOM_PASSWORD || 'investor2026';
  const validToken = await generateToken(expected);

  if (token && token === validToken) {
    return NextResponse.next();
  }

  // Check signed invite session cookie
  const sessionCookie = request.cookies.get('dataroom_session')?.value;
  if (sessionCookie) {
    const secret = process.env.SESSION_SECRET || process.env.DATAROOM_PASSWORD || 'investor2026';
    if (await verifySignedSession(sessionCookie, secret)) {
      return NextResponse.next();
    }
  }

  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
