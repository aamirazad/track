import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "TrackShelf",
	description: "Track movies you have watched and books you have read",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body>
				<Script
					src="/api/script.js"
					data-site-id="5"
					strategy="afterInteractive"
				/>
				<Toaster />
				{children}
			</body>
		</html>
	);
}
