"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { type CreateMovieData, createMovie } from "@/app/actions/movies";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddMovieModalProps {
	onMovieAdded?: () => void;
}

export function AddMovieModal({ onMovieAdded }: AddMovieModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<CreateMovieData>({
		title: "",
		director: "",
		posterUrl: "",
		rating: undefined,
		dateWatched: new Date(),
		notes: "",
		genres: [],
		runtime: undefined,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const genresArray =
				formData.genres.length > 0
					? formData.genres
					: formData.genres
							.toString()
							.split(",")
							.map((g) => g.trim())
							.filter((g) => g);

			const movieData: CreateMovieData = {
				...formData,
				genres: genresArray,
				rating: formData.rating || undefined,
				runtime: formData.runtime || undefined,
			};

			const result = await createMovie(movieData);

			if (result) {
				setIsOpen(false);
				resetForm();
				onMovieAdded?.();
			}
		} catch (error) {
			console.error("Error creating movie:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			director: "",
			posterUrl: "",
			rating: undefined,
			dateWatched: new Date(),
			notes: "",
			genres: [],
			runtime: undefined,
		});
	};

	const handleGenreChange = (value: string) => {
		const genresArray = value
			.split(",")
			.map((g) => g.trim())
			.filter((g) => g);
		setFormData((prev) => ({ ...prev, genres: genresArray }));
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2"
			>
				<Plus className="h-4 w-4" />
				Add Movie
			</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Add New Movie</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="title">Title *</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										title: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div>
							<Label htmlFor="director">Director *</Label>
							<Input
								id="director"
								value={formData.director}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										director: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div>
							<Label htmlFor="posterUrl">
								Poster URL (optional)
							</Label>
							<Input
								id="posterUrl"
								value={formData.posterUrl}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										posterUrl: e.target.value,
									}))
								}
								placeholder="https://..."
							/>
						</div>

						<div>
							<Label htmlFor="rating">Rating (1-5)</Label>
							<Input
								id="rating"
								type="number"
								min="1"
								max="5"
								step="0.1"
								value={formData.rating || ""}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										rating: e.target.value
											? Number.parseFloat(e.target.value)
											: undefined,
									}))
								}
							/>
						</div>

						<div>
							<Label htmlFor="runtime">Runtime (minutes)</Label>
							<Input
								id="runtime"
								type="number"
								min="1"
								value={formData.runtime || ""}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										runtime: e.target.value
											? Number.parseInt(e.target.value)
											: undefined,
									}))
								}
							/>
						</div>

						<div>
							<Label htmlFor="dateWatched">Date Watched *</Label>
							<Input
								id="dateWatched"
								type="date"
								value={
									formData.dateWatched
										.toISOString()
										.split("T")[0]
								}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										dateWatched: new Date(e.target.value),
									}))
								}
								required
							/>
						</div>

						<div>
							<Label htmlFor="genres">
								Genres (comma-separated)
							</Label>
							<Input
								id="genres"
								value={
									Array.isArray(formData.genres)
										? formData.genres.join(", ")
										: formData.genres
								}
								onChange={(e) =>
									handleGenreChange(e.target.value)
								}
								placeholder="Action, Drama, Thriller"
							/>
						</div>

						<div>
							<Label htmlFor="notes">Notes</Label>
							<textarea
								id="notes"
								value={formData.notes}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										notes: e.target.value,
									}))
								}
								className="min-h-20 w-full resize-y rounded-lg border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-gray-800"
								placeholder="Your thoughts about this movie..."
							/>
						</div>

						<div className="flex justify-end gap-2 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsOpen(false)}
								disabled={isSubmitting}
							>
								<X className="mr-1 h-4 w-4" />
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								<Save className="mr-1 h-4 w-4" />
								{isSubmitting ? "Adding..." : "Add Movie"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
