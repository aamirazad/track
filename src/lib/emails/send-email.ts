import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

export interface SendEmailOptions {
	to: string | string[];
	subject: string;
	html?: string;
	text?: string;
	from?: string;
	replyTo?: string;
}

export async function sendEmail({
	to,
	subject,
	html,
	text,
	from = process.env.FROM_EMAIL || "track@mail.aamira.me",
	replyTo,
}: SendEmailOptions) {
	try {
		// Prepare email payload - Resend requires at least html or text
		const emailPayload: {
			from: string;
			to: string | string[];
			subject: string;
			html?: string;
			text?: string;
			replyTo?: string;
		} = {
			from,
			to,
			subject,
			...(replyTo && { replyTo }),
		};

		if (html) {
			emailPayload.html = html;
		}
		if (text) {
			emailPayload.text = text;
		}

		// If neither html nor text is provided, throw an error
		if (!html && !text) {
			throw new Error("Either html or text content must be provided");
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { data, error } = await resend.emails.send(emailPayload as any);

		if (error) {
			console.error("Error sending email:", error);
			throw new Error(`Failed to send email: ${error.message}`);
		}

		return { success: true, data };
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
