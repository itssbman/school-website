import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/portal")) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "schoolkit-demo-secret-key-2024" });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based guard: /portal/<role>/... must match session role
  const segments = pathname.split("/").filter(Boolean);
  const portalRole = segments[1]; // parent | student | teacher | admin

  if (portalRole && ["parent", "student", "teacher", "admin"].includes(portalRole)) {
    if (token.role !== portalRole) {
      return NextResponse.redirect(new URL(`/portal/${token.role}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
