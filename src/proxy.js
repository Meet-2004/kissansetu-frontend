import { NextResponse } from "next/server";

export default function middleware(request) {
  const token = request.cookies.get("accessToken");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};