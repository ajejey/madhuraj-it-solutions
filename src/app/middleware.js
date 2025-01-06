import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

const publicPaths = ['/', '/auth/login', '/about', '/services', '/contact'];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const user = await verifyAuth();
  
  // Redirect to login if not authenticated
  if (!user && !path.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
