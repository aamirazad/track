"use client";

import { Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/lib/mock-data";

interface MovieCardProps {
	movie: Movie;
	onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
	return (
		<Card
			className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
			onClick={onClick}
		>
			<CardContent className="p-4">
				<div className="flex gap-4">
					<div className="flex-shrink-0">
						{movie.posterUrl ? (
							<img
								src={movie.posterUrl}
								alt={`${movie.title} poster`}
								className="h-32 w-20 rounded object-cover"
							/>
						) : (
							<div className="flex h-32 w-20 items-center justify-center rounded bg-slate-200">
								<span className="text-2xl">🎬</span>
							</div>
						)}
					</div>
					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-lg">
							{movie.title}
						</h3>
						<p className="mb-2 text-slate-600 dark:text-slate-400">
							Directed by {movie.director}
						</p>

						{movie.rating && (
							<div className="mb-2 flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={`star-${movie.id}-${i}`}
										className={`h-4 w-4 ${
											i < Math.floor(movie.rating ?? 0)
												? "fill-yellow-400 text-yellow-400"
												: "text-slate-300"
										}`}
									/>
								))}
								<span className="ml-1 text-slate-600 text-sm dark:text-slate-400">
									{movie.rating}/5
								</span>
							</div>
						)}

						<div className="mb-2 flex flex-wrap gap-1">
							{movie.genres.slice(0, 2).map((genre) => (
								<span
									key={genre}
									className="rounded-full bg-purple-100 px-2 py-1 text-purple-800 text-xs dark:bg-purple-900 dark:text-purple-200"
								>
									{genre}
								</span>
							))}
							{movie.genres.length > 2 && (
								<span className="text-slate-500 text-xs">
									+{movie.genres.length - 2} more
								</span>
							)}
						</div>

						<div className="flex items-center justify-between">
							<p className="text-slate-600 text-sm dark:text-slate-400">
								Watched:{" "}
								{new Date(
									movie.dateWatched,
								).toLocaleDateString()}
							</p>
							{movie.runtime && (
								<div className="flex items-center gap-1 text-slate-500 text-sm">
									<Clock className="h-3 w-3" />
									<span>{movie.runtime}min</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
