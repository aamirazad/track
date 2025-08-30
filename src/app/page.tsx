import {
	BookOpenText,
	ChartNoAxesCombined,
	List,
	Popcorn,
	Search,
	TvMinimal,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
	return (
		<div className="mx-auto">
			{/* Hero */}
			<section className="justify-center px-6 pt-24 pb-36">
				<div className="grid gap-12 md:grid-cols-5 md:gap-10">
					<div className="col-span-3 flex flex-col gap-6">
						<h1 className="max-w-xl font-bold text-4xl text-slate-800 leading-tight tracking-tight md:text-5xl dark:text-slate-100">
							Track what you watch, read, or experience — all in
							one place.
						</h1>
						<p className="max-w-lg text-base text-slate-600 leading-relaxed dark:text-slate-300">
							TrackShelf keeps films, series and books organized
							without bloat. Fast, minimal friction, instantly
							searchable. Build smart lists, log progress, and
							surface what deserves your time.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link
								href="/sign-in"
								className="rounded-md bg-slate-900 px-5 py-3 font-semibold text-sm text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:focus:ring-slate-600 dark:hover:bg-white"
							>
								Start now (free) →
							</Link>
							<a
								href="#organize"
								className="rounded-md border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
							>
								Learn more
							</a>
						</div>
						<div className="mt-4 ml-2 flex flex-wrap gap-4 text-slate-500 text-xs dark:text-slate-400">
							<div className="flex items-center gap-1">
								<span className="h-2 w-2 rounded-sm bg-emerald-500" />{" "}
								Fast UI
							</div>
							<div className="flex items-center gap-1">
								<span className="h-2 w-2 rounded-sm bg-indigo-500" />{" "}
								Open source
							</div>
							<div className="flex items-center gap-1">
								<span className="h-2 w-2 rounded-sm bg-pink-500" />{" "}
								Own your data
							</div>
						</div>
					</div>
					<div className="col-span-2 flex flex-col gap-4 md:pt-4">
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
							{[
								{
									title: "Movies",
									emoji: <Popcorn />,
									desc: "Log and rate films.",
								},
								{
									title: "Series",
									emoji: <TvMinimal />,
									desc: "Track episodes & seasons.",
								},
								{
									title: "Books",
									emoji: <BookOpenText />,
									desc: "Let the collection grow.",
								},
								{
									title: "Lists",
									emoji: <List />,
									desc: "Add the next one to the queue.",
								},
								{
									title: "Stats",
									emoji: <ChartNoAxesCombined />,
									desc: "Time, genres, pace.",
								},
								{
									title: "Discover",
									emoji: <Search />,
									desc: "Find what's next.",
								},
							].map((card) => (
								<div
									key={card.title}
									className="flex flex-col rounded-md border border-slate-300 bg-white p-4 text-slate-700 shadow-sm hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
								>
									<div className="mb-2 flex items-center gap-2 font-medium">
										{card.emoji}
										{card.title}
									</div>
									<p className="text-slate-500 text-xs leading-relaxed dark:text-slate-400">
										{card.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Organize Section */}
			<section id="organize" className="px-6 pb-24">
				<div className="grid gap-10 md:grid-cols-2">
					<div className="flex flex-col gap-4">
						<h2 className="font-bold text-2xl text-slate-800 tracking-tight dark:text-slate-100">
							Organize without friction
						</h2>
						<p className="text-slate-600 text-sm leading-relaxed dark:text-slate-300">
							Drop items into groups. TrackShelf should adapt to
							your brain, not the other way around.
						</p>
						<ul className="mt-2 space-y-2 text-slate-600 text-xs dark:text-slate-400">
							<li>• Edit everything</li>
							<li>• Batch actions</li>
							<li>• Tags</li>
							<li>• Search</li>
						</ul>
					</div>
					<div className="flex flex-col gap-4">
						<div className="rounded-md border border-slate-300 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
							<div className="mb-3 font-medium text-slate-500 text-xs uppercase tracking-wide dark:text-slate-400">
								Snapshot mock
							</div>
							<div className="grid grid-cols-3 gap-3 text-xs">
								{["In Progress", "Queued", "Finished"].map(
									(label) => (
										<div
											key={label}
											className="rounded-sm border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800"
										>
											<div className="mb-1 font-medium text-slate-700 dark:text-slate-200">
												{label}
											</div>
											<div className="space-y-1">
												<div className="h-2 w-full rounded bg-gradient-to-r from-indigo-400 to-indigo-600 dark:from-indigo-500 dark:to-indigo-400" />
												<div className="h-2 w-3/4 rounded bg-gradient-to-r from-pink-400 to-pink-600 dark:from-pink-500 dark:to-pink-400" />
												<div className="h-2 w-1/2 rounded bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-400" />
											</div>
										</div>
									),
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Library Preview */}
			<section id="library" className="px-6 pb-28">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<h2 className="font-semibold text-slate-800 text-xl tracking-tight dark:text-slate-100">
						Your library stays legible
					</h2>
					<div className="flex gap-3 text-slate-500 text-xs dark:text-slate-400">
						<span>Compact density</span>
						<span>Color-coded progress</span>
						<span>Adaptive grouping</span>
					</div>
				</div>
				<div className="mt-8 grid gap-4 rounded-md border border-slate-300 bg-white p-4 shadow-sm md:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
					{[
						"The Left Hand of Darkness",
						"Andor S1",
						"Spirited Away",
						"Dune",
						"The Bear S2",
						"Project Hail Mary",
						"Blade Runner 2049",
						"Oppenheimer",
					].map((item) => (
						<div
							key={item}
							className="flex flex-col gap-2 rounded-sm border border-slate-200 bg-slate-50 p-3 text-slate-700 text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
						>
							<div className="line-clamp-2 font-medium leading-snug">
								{item}
							</div>
							<div className="flex h-2 w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
								<div
									className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
									style={{
										width: `${40 + Math.random() * 55}%`,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA Footer */}
			<div className="mx-auto max-w-4xl px-6 pb-20">
				<div className="flex flex-col items-center gap-6 rounded-md border border-slate-300 bg-white px-8 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
					<h2 className="max-w-2xl font-bold text-2xl text-slate-800 tracking-tight dark:text-slate-100">
						Come try it out for yourself
					</h2>
					<p className="max-w-xl text-slate-600 text-sm leading-relaxed dark:text-slate-300">
						TrackShelf is still a work in progress, but if this
						seems like the perfect app for you, create an account
						now.
					</p>

					<Link
						href="/sign-in"
						className="rounded-md bg-slate-900 px-6 py-3 font-semibold text-sm text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
					>
						Get started →
					</Link>

					<div className="text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
						In beta, here be dragons.
					</div>
				</div>
			</div>
		</div>
	);
}
