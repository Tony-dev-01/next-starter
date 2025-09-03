import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/sign-in', '/sign-up'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get the session token from cookies
  const sessionToken = request.cookies.get('better-auth.session_token');

  // If accessing a protected route
  if (isProtectedRoute) {
    if (!sessionToken) {
      // No session token, redirect to sign-in
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Verify the session token with better-auth
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        method: 'GET',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
      });

      if (!response.ok) {
        // Invalid session, redirect to sign-in
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      // On error, redirect to sign-in for safety
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If accessing auth routes while already authenticated
  if (isAuthRoute && sessionToken) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        method: 'GET',
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
      });

      if (response.ok) {
        // User is authenticated, redirect to dashboard
        const redirectTo = request.nextUrl.searchParams.get('redirectTo') || '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, request.url));
      }
    } catch (error) {
      // If verification fails, let them access auth routes
      console.error('Session verification failed:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - IMPORTANT: Don't interfere with auth endpoints
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-in, sign-up (auth pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
  ],
};