"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieCard } from "@/components/ui/movie-card";
import { NotesModal } from "@/components/ui/notes-modal";
import { AddMovieModal } from "@/components/ui/add-movie-modal";
import { getMovies, type Movie } from "@/app/actions/movies";

export default function MoviesPage() {
	const [selectedItem, setSelectedItem] = useState<Movie | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const loadMovies = useCallback(async () => {
		try {
			setIsLoading(true);
			const userMovies = await getMovies();
			setMovies(userMovies);
		} catch (error) {
			console.error("Error loading movies:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadMovies();
	}, [loadMovies]);

	const handleMovieClick = (movie: Movie) => {
		setSelectedItem(movie);
		setIsModalOpen(true);
	};

	const handleNotesUpdate = () => {
		loadMovies(); // Refresh the movies list
	};

	if (isLoading) {
		return (
			<div className="flex w-full flex-col space-y-8">
				<div className="space-y-2">
					<h1 className="font-bold text-5xl">My Movies</h1>
					<p className="text-slate-600 dark:text-slate-400">
						Loading your movies...
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4">
					{[...Array(6)].map((_, i) => (
						<div key={`skeleton-${i}`} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
							<div className="h-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
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
						<h1 className="font-bold text-5xl">My Movies</h1>
						<p className="text-slate-600 dark:text-slate-400">
							{movies.length === 0 
								? "No movies tracked yet" 
								: `${movies.length} movie${movies.length === 1 ? "" : "s"} in your collection`
							}
						</p>
					</div>
					<AddMovieModal onMovieAdded={loadMovies} />
				</div>
			</div>

			{movies.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="text-6xl mb-4">🎬</div>
					<h2 className="font-semibold text-2xl mb-2">No movies yet</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
						Start building your movie collection by adding your first film. 
						Track what you've watched, rate them, and add your thoughts!
					</p>
					<AddMovieModal onMovieAdded={loadMovies} />
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{movies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onClick={() => handleMovieClick(movie)}
						/>
					))}
				</div>
			)}

			<NotesModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				type="movie"
				onNotesUpdate={handleNotesUpdate}
			/>
		</div>
	);
}
