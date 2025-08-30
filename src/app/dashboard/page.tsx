"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	// Redirect after session loads if unauthenticated
	useEffect(() => {
		if (!isPending && !session) {
			router.push("/sign-in");
		}
	}, [isPending, session, router]);

	if (isPending) {
		return <div>Loading session...</div>; // Show skeleton while session is loading
	}

	if (!session) {
		return null;
	}

	return (
		<div>
			<h1>Welcome {session.user?.name}</h1>
			{/* Your dashboard content */}
		</div>
	);
}
