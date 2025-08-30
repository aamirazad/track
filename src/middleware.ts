import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
	// only run this middleware for the site root
	matcher: ["/"],
};

export function middleware(request: NextRequest) {
	// if has auth cookie, send to dashboard, otherwise, show the landing page
	const token = request.cookies.get("better-auth.session_token")?.value;

	if (token) {
		return NextResponse.rewrite(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}
