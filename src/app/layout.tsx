import Header from "@/components/blocks/header";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "TrackShelf",
	description: "Track movies you have watched and books you have read",
	icons: [{ rel: "icon", url: "/img/books.svg" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geist.variable}`}
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Script
						src="https://www.aamira.me/api/script.js"
						data-site-id="5"
						strategy="afterInteractive"
					/>
					<main className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,theme(colors.slate.200)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_20%,theme(colors.slate.800)_0%,transparent_60%)]">
						<div
							className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply dark:opacity-40"
							style={{
								background:
									"linear-gradient(120deg,rgba(120,178,255,.35),rgba(255,138,246,.25),rgba(140,255,210,.25))",
							}}
						/>
						<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]" />

						<div className="relative z-10 flex min-h-screen flex-col">
							<Toaster />
							<Header />
							<div className="flex flex-1">{children}</div>
							<footer>
								<div className="mt-10 flex flex-col items-center gap-2 pb-10 text-[11px] text-slate-500 dark:text-slate-500">
									<div>
										© {new Date().getFullYear()} TrackShelf
									</div>
								</div>
							</footer>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
