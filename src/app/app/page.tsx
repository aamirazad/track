"use client";

import { useState } from "react";
import { mockBooks, mockMovies } from "@/lib/mock-data";
import { BookCard } from "@/components/ui/book-card";
import { MovieCard } from "@/components/ui/movie-card";
import { NotesModal } from "@/components/ui/notes-modal";
import type { Book, Movie } from "@/lib/mock-data";

export default function DashboardPage() {
	const [selectedItem, setSelectedItem] = useState<Book | Movie | null>(null);
	const [modalType, setModalType] = useState<"book" | "movie">("book");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleBookClick = (book: Book) => {
		setSelectedItem(book);
		setModalType("book");
		setIsModalOpen(true);
	};

	const handleMovieClick = (movie: Movie) => {
		setSelectedItem(movie);
		setModalType("movie");
		setIsModalOpen(true);
	};

	const recentBooks = mockBooks.slice(0, 3);
	const recentMovies = mockMovies.slice(0, 3);

	return (
		<div className="flex w-full flex-col space-y-8">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold">Welcome back!</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Here's what you've been tracking recently.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="tracking-tight text-sm font-medium">Books Read</h3>
						<span className="text-2xl">📚</span>
					</div>
					<div className="text-2xl font-bold">{mockBooks.length}</div>
					<p className="text-xs text-muted-foreground">
						+2 from last month
					</p>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="tracking-tight text-sm font-medium">Movies Watched</h3>
						<span className="text-2xl">🎬</span>
					</div>
					<div className="text-2xl font-bold">{mockMovies.length}</div>
					<p className="text-xs text-muted-foreground">
						+1 from last month
					</p>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="tracking-tight text-sm font-medium">Average Rating</h3>
						<span className="text-2xl">⭐</span>
					</div>
					<div className="text-2xl font-bold">4.5</div>
					<p className="text-xs text-muted-foreground">
						Across all items
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Recently Read Books</h2>
					<a href="/app/books" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
						View all →
					</a>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{recentBooks.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							onClick={() => handleBookClick(book)}
						/>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Recently Watched Movies</h2>
					<a href="/app/movies" className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400">
						View all →
					</a>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{recentMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onClick={() => handleMovieClick(movie)}
						/>
					))}
				</div>
			</div>

			<NotesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				type={modalType}
			/>
		</div>
	);
}
