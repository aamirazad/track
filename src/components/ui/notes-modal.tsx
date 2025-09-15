"use client";

import { Calendar, Clock, Star, User } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Book, Movie } from "@/lib/mock-data";

interface NotesModalProps {
	isOpen: boolean;
	onClose: () => void;
	item: Book | Movie | null;
	type: "book" | "movie";
}

export function NotesModal({ isOpen, onClose, item, type }: NotesModalProps) {
	if (!item) return null;

	const isBook = type === "book";
	const book = isBook ? (item as Book) : null;
	const movie = !isBook ? (item as Movie) : null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						<div className="flex-shrink-0">
							{(isBook ? book?.coverUrl : movie?.posterUrl) ? (
								<img
									src={
										isBook
											? book?.coverUrl
											: movie?.posterUrl
									}
									alt={`${item.title} ${isBook ? "cover" : "poster"}`}
									className="h-20 w-14 rounded object-cover"
								/>
							) : (
								<div className="flex h-20 w-14 items-center justify-center rounded bg-slate-200">
									<span className="text-xl">
										{isBook ? "📚" : "🎬"}
									</span>
								</div>
							)}
						</div>
						<div className="min-w-0 flex-1">
							<h2 className="font-bold text-xl">{item.title}</h2>
							<p className="text-slate-600 dark:text-slate-400">
								{isBook
									? `by ${book?.author}`
									: `Directed by ${movie?.director}`}
							</p>
						</div>
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Rating */}
					{item.rating && (
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={`modal-star-${item.id}-${i}`}
										className={`h-4 w-4 ${
											i < Math.floor(item.rating ?? 0)
												? "fill-yellow-400 text-yellow-400"
												: "text-slate-300"
										}`}
									/>
								))}
							</div>
							<span className="font-medium text-sm">
								{item.rating}/5
							</span>
						</div>
					)}

					{/* Metadata */}
					<div className="flex flex-wrap gap-4 text-slate-600 text-sm dark:text-slate-400">
						<div className="flex items-center gap-1">
							<Calendar className="h-4 w-4" />
							<span>
								{isBook
									? `Completed: ${new Date(book?.dateCompleted || "").toLocaleDateString()}`
									: `Watched: ${new Date(movie?.dateWatched || "").toLocaleDateString()}`}
							</span>
						</div>

						{movie?.runtime && (
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								<span>{movie.runtime} minutes</span>
							</div>
						)}
					</div>

					{/* Genres */}
					<div className="flex flex-wrap gap-2">
						{item.genres.map((genre) => (
							<span
								key={genre}
								className={`rounded-full px-3 py-1 font-medium text-xs ${
									isBook
										? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
										: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
								}`}
							>
								{genre}
							</span>
						))}
					</div>

					{/* Notes */}
					<div>
						<h3 className="mb-2 flex items-center gap-2 font-semibold">
							<User className="h-4 w-4" />
							My Notes
						</h3>
						<div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
							<p className="whitespace-pre-wrap text-sm leading-relaxed">
								{item.notes}
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
