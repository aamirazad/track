"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { type CreateBookData, createBook } from "@/app/actions/books";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddBookModalProps {
	onBookAdded?: () => void;
}

export function AddBookModal({ onBookAdded }: AddBookModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<CreateBookData>({
		title: "",
		author: "",
		coverUrl: "",
		rating: undefined,
		dateCompleted: new Date(),
		notes: "",
		genres: [],
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

			const bookData: CreateBookData = {
				...formData,
				genres: genresArray,
				rating: formData.rating || undefined,
			};

			const result = await createBook(bookData);

			if (result) {
				setIsOpen(false);
				resetForm();
				onBookAdded?.();
			}
		} catch (error) {
			console.error("Error creating book:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetForm = () => {
		setFormData({
			title: "",
			author: "",
			coverUrl: "",
			rating: undefined,
			dateCompleted: new Date(),
			notes: "",
			genres: [],
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
				Add Book
			</Button>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Add New Book</DialogTitle>
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
							<Label htmlFor="author">Author *</Label>
							<Input
								id="author"
								value={formData.author}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										author: e.target.value,
									}))
								}
								required
							/>
						</div>

						<div>
							<Label htmlFor="coverUrl">
								Cover URL (optional)
							</Label>
							<Input
								id="coverUrl"
								value={formData.coverUrl}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										coverUrl: e.target.value,
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
							<Label htmlFor="dateCompleted">
								Date Completed *
							</Label>
							<Input
								id="dateCompleted"
								type="date"
								value={
									formData.dateCompleted
										.toISOString()
										.split("T")[0]
								}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										dateCompleted: new Date(e.target.value),
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
								placeholder="Fiction, Romance, Fantasy"
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
								placeholder="Your thoughts about this book..."
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
								{isSubmitting ? "Adding..." : "Add Book"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
