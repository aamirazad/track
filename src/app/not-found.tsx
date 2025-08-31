import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-9 py-24">
			<div className="flex items-center justify-center">
				<h1 className="mr-5 border-slate-300 border-r pr-6 font-medium text-2xl leading-none dark:border-slate-600">
					404
				</h1>
				<h2 className="ml-6 font-normal text-base text-slate-600 dark:text-slate-400">
					This page could not be found.
				</h2>
			</div>
			<Link className="text-slate-700 dark:text-slate-400" href="/">
				Return Home
			</Link>
		</div>
	);
}
