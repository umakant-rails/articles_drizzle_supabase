import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";


interface ProtectedRoute { path: string; roles: number[]; }
const protectedRoutes: ProtectedRoute[] = [
  { path: "/admin", roles: [1] },
  { path: "/users", roles: [2] },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  const match = protectedRoutes.find((route) => pathname.startsWith(route.path));

  if (match) {
    if (!token) { return NextResponse.redirect(new URL("/auth/login", request.url));  }

    const userRoleId = token.roleId as number;
    if (!match.roles.includes(userRoleId ?? 0)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
