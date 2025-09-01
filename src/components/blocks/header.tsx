"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";

function NavLinks({ isLandingPage }: { isLandingPage: boolean }) {
	if (isLandingPage) {
		return (
			<nav className="hidden items-center gap-6 font-medium text-sm md:flex">
				<a
					className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
					href="#organize"
				>
					Organize
				</a>
				<a
					className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
					href="#library"
				>
					Library
				</a>
			</nav>
		);
	}
	return null;
}

export default function Header() {
	const pathname = usePathname();
	const { data: session, isPending } = authClient.useSession();
	const isLandingPage = pathname === "/" || pathname === "/home";

	return (
		<header className="flex items-center justify-between gap-4 px-6 py-5">
			<Link
				href={pathname === "/app" ? "/home" : "/"}
				className="flex items-center gap-2 font-semibold tracking-tight"
			>
				<div className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
					📚
				</div>
				<span className="text-lg">TrackShelf</span>
			</Link>
			<NavLinks isLandingPage={isLandingPage} />
			<div className="flex items-center gap-3">
				{isLandingPage ? (
					session ? (
						<Link
							href="/app"
							className="inline-flex h-9 w-26 items-center justify-center rounded-md bg-white px-4 font-medium text-slate-800 text-sm leading-none shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
						>
							Dashboard
						</Link>
					) : isPending ? (
						<span className="inline-flex h-9 w-26 items-center justify-center rounded-md bg-white px-4 font-medium text-slate-800 text-sm leading-none shadow-sm dark:bg-slate-800 dark:text-slate-100">
							<span className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-white/30" />
						</span>
					) : (
						<Link
							href="/sign-in"
							className="inline-flex h-9 w-26 items-center justify-center rounded-md bg-white px-4 font-medium text-slate-800 text-sm leading-none shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
						>
							Sign in
						</Link>
					)
				) : null}
				<ThemeToggle />
			</div>
		</header>
	);
}
