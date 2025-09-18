"use client";

import { useCallback, useEffect, useState } from "react";
import { type Book, getBooks } from "@/app/actions/books";
import { AddBookModal } from "@/components/ui/add-book-modal";
import { BookCard } from "@/components/ui/book-card";
import { NotesModal } from "@/components/ui/notes-modal";

export default function BooksPage() {
	const [selectedItem, setSelectedItem] = useState<Book | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [books, setBooks] = useState<Book[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const loadBooks = useCallback(async () => {
		try {
			setIsLoading(true);
			const userBooks = await getBooks();
			setBooks(userBooks);
		} catch (error) {
			console.error("Error loading books:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadBooks();
	}, [loadBooks]);

	const handleBookClick = (book: Book) => {
		setSelectedItem(book);
		setIsModalOpen(true);
	};

	const handleNotesUpdate = () => {
		loadBooks(); // Refresh the books list
	};

	if (isLoading) {
		return (
			<div className="flex w-full flex-col space-y-8">
				<div className="space-y-2">
					<h1 className="font-bold text-5xl">My Books</h1>
					<p className="text-slate-600 dark:text-slate-400">
						Loading your books...
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{[...Array(6)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
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
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-5xl">My Books</h1>
						<p className="text-slate-600 dark:text-slate-400">
							{books.length === 0
								? "No books tracked yet"
								: `${books.length} book${books.length === 1 ? "" : "s"} in your collection`}
						</p>
					</div>
					<AddBookModal onBookAdded={loadBooks} />
				</div>
			</div>

			{books.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="mb-4 text-6xl">📚</div>
					<h2 className="mb-2 font-semibold text-2xl">
						No books yet
					</h2>
					<p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
						Start building your reading collection by adding your
						first book. Track what you've read, rate them, and add
						your thoughts!
					</p>
					<AddBookModal onBookAdded={loadBooks} />
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{books.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							onClick={() => handleBookClick(book)}
						/>
					))}
				</div>
			)}

			<NotesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				type="book"
				onNotesUpdate={handleNotesUpdate}
			/>
		</div>
	);
}
