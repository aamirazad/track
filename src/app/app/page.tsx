"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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

	return (
		<div className="flex flex-col items-center justify-center gap-4 border-2">
			{[1, 2, 3, 4].map((i) => (
				<Button className="w-34 rounded-r-none rounded-l-md" key={i}>
					{i}
				</Button>
			))}
		</div>
	);
}
