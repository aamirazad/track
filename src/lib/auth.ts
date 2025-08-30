import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { sendEmail } from "@/lib/emails/send-email";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	trustedOrigins: [
		"http://localhost:3000",
		"https://track.aamira.me",
		"https://*-aamira.vercel.app",
	],
	emailAndPassword: {
		enabled: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
	},
});
