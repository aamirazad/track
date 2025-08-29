import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default async function DashboardPage() {
	const session = await authClient.getSession();

	if (!session) {
		redirect("/signin");
	}

	return (
		<div>
			<h1>Welcome, {session.user.name} 👋</h1>
			<p>Your email: {session.user.email}</p>
		</div>
	);
}
