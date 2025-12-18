import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");

  console.log("PATH:", req.nextUrl.pathname);
  console.log("COOKIE:", accessToken?.value);
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      console.log(" TIDAK ADA TOKEN, REDIRECT");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
  };
  
