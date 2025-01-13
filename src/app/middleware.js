import { NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

const publicPaths = ['/', '/auth/login', '/about', '/services', '/contact'];

export async function middleware(request) {
  try {
    console.log("Middleware executing for path:", request.nextUrl.pathname);
    
    const path = request.nextUrl.pathname;
    
    // Public paths that don't require auth
    if (path.startsWith('/_next') || 
        path.startsWith('/api') || 
        path.startsWith('/static') ||
        path === '/login' ||
        path === '/favicon.ico') {
      console.log("Public path, skipping auth check");
      return NextResponse.next();
    }

    const user = await verifyAuth();
    console.log("Middleware auth check result:", { 
      path,
      authenticated: !!user,
      userRole: user?.role 
    });

    // Redirect to login if not authenticated
    if (!user && !path.startsWith('/auth')) {
      console.log("No auth, redirecting to login");
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow access to admin only for admin users
    if (path.startsWith('/admin') && user?.role !== 'admin') {
      console.log("Non-admin attempting to access admin area");
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", {
      message: error.message,
      stack: error.stack
    });
    // On error, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
