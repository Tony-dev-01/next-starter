import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected and auth routes
  const protectedRoutes = ["/dashboard", "/teams"];
  const authRoutes = ["/sign-in", "/sign-up"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

  // Get the session cookie (lightweight check only)
  const sessionToken = getSessionCookie(request);

  // If accessing a protected route
  if (isProtectedRoute) {
    if (!sessionToken) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If accessing auth routes while already authenticated
  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Handle internationalization for all other routes
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
