"use client";

import { Star } from "lucide-react";
import type { Book } from "@/app/actions/books";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
	book: Book;
	onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
	return (
		<Card
			className="hover cursor-pointer transition-all hover:bg-gray-900"
			onClick={onClick}
		>
			<CardContent className="p-4">
				<div className="flex gap-4">
					<div className="flex-shrink-0">
						{book.coverUrl ? (
							<img
								src={book.coverUrl}
								alt={`${book.title} cover`}
								className="h-32 w-20 rounded object-cover"
							/>
						) : (
							<div className="flex h-32 w-20 items-center justify-center rounded bg-slate-200">
								<span className="text-2xl">📚</span>
							</div>
						)}
					</div>
					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-lg">
							{book.title}
						</h3>
						<p className="mb-2 text-slate-600 dark:text-slate-400">
							by {book.author}
						</p>

						{book.rating && (
							<div className="mb-2 flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={`star-${book.id}-${i}`}
										className={`h-4 w-4 ${
											i <
											Math.floor(
												Number.parseFloat(
													book.rating!,
												) || 0,
											)
												? "fill-yellow-400 text-yellow-400"
												: "text-slate-300"
										}`}
									/>
								))}
								<span className="ml-1 text-slate-600 text-sm dark:text-slate-400">
									{book.rating}/5
								</span>
							</div>
						)}

						<div className="mb-2 flex flex-wrap gap-1">
							{book.genres.slice(0, 2).map((genre) => (
								<span
									key={genre}
									className="rounded-full bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900 dark:text-blue-200"
								>
									{genre}
								</span>
							))}
							{book.genres.length > 2 && (
								<span className="text-slate-500 text-xs">
									+{book.genres.length - 2} more
								</span>
							)}
						</div>

						<p className="text-slate-600 text-sm dark:text-slate-400">
							Completed:{" "}
							{new Date(book.dateCompleted).toLocaleDateString()}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
