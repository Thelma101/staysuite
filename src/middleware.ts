import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection middleware.
 *
 * In production this will read the auth token from cookies and validate
 * the session + dashboard role. For now it defines the route-group →
 * required-role mapping so the architecture is ready for auth integration.
 */

const PUBLIC_PATHS = ["/", "/login", "/register"];

const ROLE_ROUTE_MAP: Record<string, string[]> = {
  user: ["/user"],
  hotel_staff: ["/hotel"],
  admin: ["/admin"],
};

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

function getRequiredRole(pathname: string): string | null {
  for (const [role, prefixes] of Object.entries(ROLE_ROUTE_MAP)) {
    if (prefixes.some((p) => pathname.startsWith(p))) {
      return role;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const requiredRole = getRequiredRole(pathname);

  if (!requiredRole) {
    return NextResponse.next();
  }

  // TODO: Replace with real session/token validation
  // const session = await getSession(request);
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // if (session.dashboardRole !== requiredRole) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|figma/).*)",
  ],
};
