import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	baseURL:
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.SITE_URL ||
		"http://localhost:3000",
	trustedOrigins: [
		"http://localhost:3000",
		"https://track.aamira.me",
		"https://*-aamira.vercel.app",
	],
	emailAndPassword: {
		enabled: true,
	},
});
