"use server";

import { authClient } from "@/lib/auth-client";

interface VerificationEmailProps {
	email: string;
	callbackURL?: string;
}

export default async function SendPasswordVerificationEmail({
	email,
	callbackURL,
}: VerificationEmailProps) {
	const res = await authClient.sendVerificationEmail({
		email: email,
		callbackURL: callbackURL,
	});
	console.log(res);
}
