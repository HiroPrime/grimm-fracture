import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "gf_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only count document navigations to the site, not API/assets.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  if (request.cookies.has(COOKIE)) {
    return response;
  }

  const visitorId = crypto.randomUUID();
  response.cookies.set(COOKIE, visitorId, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    // Fire-and-forget unique visitor increment (do not block the response).
    void fetch(`${url}/rest/v1/rpc/increment_unique_visitors`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    }).catch(() => {});
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
