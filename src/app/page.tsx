"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
	const {
		data: session,
		isPending, //loading state
	} = authClient.useSession();
	if (isPending) {
		return <div>Loading...</div>;
	}



	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				{session ? (
					<div className="flex flex-col items-center">
						Welcome, {session.user.name}
			
					</div>
				) : (
					<div className="itmes-center flex flex-col">
						Hello
						<Link href="/sign-in">Sign in</Link>
					</div>
				)}
			</div>
		</main>
	);
}
