import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
	matcher: ["/", "/home", "/app/:path*"],
};

export function middleware(request: NextRequest) {
	const token = request.cookies.get("better-auth.session_token")?.value;
	const pathname = request.nextUrl.pathname;
	const hasToken = !!token;

	// has token & at root -> redirect to /app
	if (hasToken && pathname === "/") {
		return NextResponse.redirect(new URL("/app", request.url));
	}

	// no token & at /home -> redirect to /
	if (!hasToken) {
		if (pathname === "/home") {
			return NextResponse.redirect(new URL("/", request.url));
		}
		if (pathname.startsWith("/app")) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}
	}

	// has token & at /home -> stay (next)
	// no token & at / -> stay (next)
	return NextResponse.next();
}
