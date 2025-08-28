import SendPasswordVerificationEmail from "@/app/actions/user";
import { Button } from "@/components/ui/button";

export default function Page() {
	return (
		<form
			action={async () => {
				"use server";
				SendPasswordVerificationEmail({ email: "aamirmazad@gmail.com" });
			}}
		>
			<Button type="submit">Click Me!</Button>
		</form>
	);
}
