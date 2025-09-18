"use client";

import { useCallback, useEffect, useState } from "react";
import { type Book, getBooksCount, getRecentBooks } from "@/app/actions/books";
import {
	getMoviesCount,
	getRecentMovies,
	type Movie,
} from "@/app/actions/movies";
import { AddBookModal } from "@/components/ui/add-book-modal";
import { AddMovieModal } from "@/components/ui/add-movie-modal";
import { BookCard } from "@/components/ui/book-card";
import { MovieCard } from "@/components/ui/movie-card";
import { NotesModal } from "@/components/ui/notes-modal";

export default function DashboardPage() {
	const [selectedItem, setSelectedItem] = useState<Book | Movie | null>(null);
	const [modalType, setModalType] = useState<"book" | "movie">("book");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [recentBooks, setRecentBooks] = useState<Book[]>([]);
	const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
	const [booksCount, setBooksCount] = useState(0);
	const [moviesCount, setMoviesCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const loadData = useCallback(async () => {
		try {
			const [books, movies, booksTotal, moviesTotal] = await Promise.all([
				getRecentBooks(3),
				getRecentMovies(3),
				getBooksCount(),
				getMoviesCount(),
			]);

			setRecentBooks(books);
			setRecentMovies(movies);
			setBooksCount(booksTotal);
			setMoviesCount(moviesTotal);
		} catch (error) {
			console.error("Error loading dashboard data:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadData();
	}, [loadData]);

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

	const calculateAverageRating = () => {
		const allItems = [...recentBooks, ...recentMovies];
		const itemsWithRating = allItems.filter((item) => item.rating);

		if (itemsWithRating.length === 0) return "N/A";

		const total = itemsWithRating.reduce((sum, item) => {
			return sum + (Number.parseFloat(item.rating!) || 0);
		}, 0);

		return (total / itemsWithRating.length).toFixed(1);
	};

	if (isLoading) {
		return (
			<div className="flex w-full flex-col space-y-8">
				<div className="space-y-2">
					<h1 className="font-bold text-5xl">Welcome back!</h1>
					<p className="text-slate-600 dark:text-slate-400">
						Loading your tracking data...
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
						>
							<div className="h-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col space-y-8">
			<div className="space-y-2">
				<h1 className="font-bold text-5xl">Welcome back!</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Here's what you've been tracking recently.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="font-medium text-sm tracking-tight">
							Books Read
						</h3>
						<span className="text-2xl">📚</span>
					</div>
					<div className="font-bold text-2xl">{booksCount}</div>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="font-medium text-sm tracking-tight">
							Movies Watched
						</h3>
						<span className="text-2xl">🎬</span>
					</div>
					<div className="font-bold text-2xl">{moviesCount}</div>
				</div>
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between space-y-0 pb-2">
						<h3 className="font-medium text-sm tracking-tight">
							Average Rating
						</h3>
						<span className="text-2xl">⭐</span>
					</div>
					<div className="font-bold text-2xl">
						{calculateAverageRating()}
					</div>
					<p className="text-muted-foreground text-xs">
						Across all items
					</p>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-2xl">
						Recently Read Books
					</h2>
					<div className="flex items-center gap-2">
						<AddBookModal onBookAdded={loadData} />
						<a
							href="/app/books"
							className="text-blue-600 text-sm hover:text-blue-800 dark:text-blue-400"
						>
							View all →
						</a>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{recentBooks.length > 0 ? (
						recentBooks.map((book) => (
							<BookCard
								key={book.id}
								book={book}
								onClick={() => handleBookClick(book)}
							/>
						))
					) : (
						<p className="text-muted-foreground">
							No books tracked yet. Start by adding your first
							book!
						</p>
					)}
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-2xl">
						Recently Watched Movies
					</h2>
					<div className="flex items-center gap-2">
						<AddMovieModal onMovieAdded={loadData} />
						<a
							href="/app/movies"
							className="text-purple-600 text-sm hover:text-purple-800 dark:text-purple-400"
						>
							View all →
						</a>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{recentMovies.length > 0 ? (
						recentMovies.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								onClick={() => handleMovieClick(movie)}
							/>
						))
					) : (
						<p className="text-muted-foreground">
							No movies tracked yet. Start by adding your first
							movie!
						</p>
					)}
				</div>
			</div>

			<NotesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				type={modalType}
				onNotesUpdate={loadData}
			/>
		</div>
	);
}
