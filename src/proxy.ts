import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// webigeeks.in is a single-purpose ads domain — its root should always show
// the Data Analytics landing page, regardless of the rest of this app's
// routes. webigeeks.com is untouched: this only ever matches the ad domain.
const AD_DOMAINS = new Set(["webigeeks.in", "www.webigeeks.in"]);

/**
 * Coarse, cookie-presence gate for protected sections. This only checks that
 * the httpOnly auth cookie exists — it cannot verify the JWT signature or
 * read the user's role (the cookie is httpOnly and the JWT secret lives only
 * on the backend). Real authorization happens server-side per request via
 * the backend's `protect`/`authorize` middleware, and each dashboard/admin
 * layout resolves the actual user (and role) via `GET /auth/me`.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const hostname = (request.headers.get("host") || "").split(":")[0];
    if (AD_DOMAINS.has(hostname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/lp/data-analytics-course";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const hasSession = request.cookies.has("token");

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/counsellor/:path*"],
};
