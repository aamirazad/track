"use server";

import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { books } from "@/lib/db/schema";

export interface Book {
	id: string;
	title: string;
	author: string;
	coverUrl?: string | null;
	rating?: string | null;
	dateCompleted: Date;
	notes: string;
	genres: string[];
}

export async function getBooks(): Promise<Book[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return [];
	}

	try {
		const userBooks = await db
			.select()
			.from(books)
			.where(eq(books.userId, session.user.id))
			.orderBy(desc(books.dateCompleted));

		return userBooks.map((book) => ({
			...book,
			rating: book.rating || undefined,
			coverUrl: book.coverUrl || undefined,
		}));
	} catch (error) {
		console.error("Error fetching books:", error);
		return [];
	}
}

export async function getRecentBooks(limit: number = 3): Promise<Book[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return [];
	}

	try {
		const userBooks = await db
			.select()
			.from(books)
			.where(eq(books.userId, session.user.id))
			.orderBy(desc(books.dateCompleted))
			.limit(limit);

		return userBooks.map((book) => ({
			...book,
			rating: book.rating || undefined,
			coverUrl: book.coverUrl || undefined,
		}));
	} catch (error) {
		console.error("Error fetching recent books:", error);
		return [];
	}
}

export async function getBooksCount(): Promise<number> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return 0;
	}

	try {
		const userBooks = await db
			.select()
			.from(books)
			.where(eq(books.userId, session.user.id));

		return userBooks.length;
	} catch (error) {
		console.error("Error fetching books count:", error);
		return 0;
	}
}

export interface CreateBookData {
	title: string;
	author: string;
	coverUrl?: string;
	rating?: number;
	dateCompleted: Date;
	notes?: string;
	genres: string[];
}

export async function createBook(data: CreateBookData): Promise<Book | null> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Not authenticated");
	}

	try {
		const [newBook] = await db
			.insert(books)
			.values({
				id: crypto.randomUUID(),
				title: data.title,
				author: data.author,
				coverUrl: data.coverUrl || null,
				rating: data.rating?.toString() || null,
				dateCompleted: data.dateCompleted,
				notes: data.notes || "",
				genres: data.genres,
				userId: session.user.id,
			})
			.returning();

		return {
			...newBook,
			rating: newBook.rating || undefined,
			coverUrl: newBook.coverUrl || undefined,
		};
	} catch (error) {
		console.error("Error creating book:", error);
		return null;
	}
}

export async function updateBookNotes(
	bookId: string,
	notes: string,
): Promise<boolean> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Not authenticated");
	}

	try {
		await db
			.update(books)
			.set({
				notes,
				updatedAt: new Date(),
			})
			.where(eq(books.id, bookId) && eq(books.userId, session.user.id));

		return true;
	} catch (error) {
		console.error("Error updating book notes:", error);
		return false;
	}
}
