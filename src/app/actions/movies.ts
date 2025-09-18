"use server";

import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { movies } from "@/lib/db/schema";

export interface Movie {
	id: string;
	title: string;
	director: string;
	posterUrl?: string | null;
	rating?: string | null;
	dateWatched: Date;
	notes: string;
	genres: string[];
	runtime?: number | null;
}

export async function getMovies(): Promise<Movie[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return [];
	}

	try {
		const userMovies = await db
			.select()
			.from(movies)
			.where(eq(movies.userId, session.user.id))
			.orderBy(desc(movies.dateWatched));

		return userMovies.map((movie) => ({
			...movie,
			rating: movie.rating || undefined,
			posterUrl: movie.posterUrl || undefined,
		}));
	} catch (error) {
		console.error("Error fetching movies:", error);
		return [];
	}
}

export async function getRecentMovies(limit: number = 3): Promise<Movie[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return [];
	}

	try {
		const userMovies = await db
			.select()
			.from(movies)
			.where(eq(movies.userId, session.user.id))
			.orderBy(desc(movies.dateWatched))
			.limit(limit);

		return userMovies.map((movie) => ({
			...movie,
			rating: movie.rating || undefined,
			posterUrl: movie.posterUrl || undefined,
		}));
	} catch (error) {
		console.error("Error fetching recent movies:", error);
		return [];
	}
}

export async function getMoviesCount(): Promise<number> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return 0;
	}

	try {
		const userMovies = await db
			.select()
			.from(movies)
			.where(eq(movies.userId, session.user.id));

		return userMovies.length;
	} catch (error) {
		console.error("Error fetching movies count:", error);
		return 0;
	}
}

export interface CreateMovieData {
	title: string;
	director: string;
	posterUrl?: string;
	rating?: number;
	dateWatched: Date;
	notes?: string;
	genres: string[];
	runtime?: number;
}

export async function createMovie(
	data: CreateMovieData,
): Promise<Movie | null> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Not authenticated");
	}

	try {
		const [newMovie] = await db
			.insert(movies)
			.values({
				id: crypto.randomUUID(),
				title: data.title,
				director: data.director,
				posterUrl: data.posterUrl || null,
				rating: data.rating?.toString() || null,
				dateWatched: data.dateWatched,
				notes: data.notes || "",
				genres: data.genres,
				runtime: data.runtime || null,
				userId: session.user.id,
			})
			.returning();

		if (!newMovie) {
			return null;
		}

		return {
			...newMovie,
			rating: newMovie.rating || undefined,
			posterUrl: newMovie.posterUrl || undefined,
		};
	} catch (error) {
		console.error("Error creating movie:", error);
		return null;
	}
}

export async function updateMovieNotes(
	movieId: string,
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
			.update(movies)
			.set({
				notes,
				updatedAt: new Date(),
			})
			.where(
				eq(movies.id, movieId) && eq(movies.userId, session.user.id),
			);

		return true;
	} catch (error) {
		console.error("Error updating movie notes:", error);
		return false;
	}
}
