import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Extract subdomain (e.g. "mydreamgirl" from "mydreamgirl.clqit.in")
  const subdomain = hostname.split('.')[0]?.toLowerCase();

  // Route map for subdomains
  const subdomainMap: Record<string, string> = {
    'mydreamgirl': 'dream-girl',
    'theeasyhard': 'easy-hard',
    'easy-hard': 'easy-hard',
  };

  const targetSlug = subdomainMap[subdomain];

  // If visiting a registered subdomain at root "/", rewrite internally to /[id]
  if (targetSlug && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(`/${targetSlug}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, _next, and favicon
     */
    '/((?!api|_next/static|_next/image|favicon.ico|backgrounds|lyrics).*)',
  ],
};