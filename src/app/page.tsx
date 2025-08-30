"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
	const { data: session, isPending } = authClient.useSession();
	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				{session ? (
					<div className="flex flex-col items-center">
						Welcome, {session.user.name}
						<Link href="/dashboard">Go to dashboard</Link>
					</div>
				) : (
					<div className="flex flex-col items-center">
						Hello
						<Link href="/sign-in">Sign in</Link>
					</div>
				)}
			</div>
		</main>
	);
}
