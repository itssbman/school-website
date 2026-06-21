import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/portal")) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "schoolkit-demo-secret-2024",
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const segments  = pathname.split("/").filter(Boolean);
  const portalRole = segments[1]; // parent | student | teacher | admin

  if (
    portalRole &&
    ["parent", "student", "teacher", "admin"].includes(portalRole) &&
    token.role !== "admin" &&
    token.role !== portalRole
  ) {
    return NextResponse.redirect(new URL(`/portal/${token.role}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
