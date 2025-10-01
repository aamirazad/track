"use client";

import { Calendar, Clock, Edit3, Save, Star, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type Book, updateBookNotes } from "@/app/actions/books";
import { type Movie, updateMovieNotes } from "@/app/actions/movies";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface NotesModalProps {
	isOpen: boolean;
	onClose: () => void;
	item: Book | Movie | null;
	type: "book" | "movie";
	onNotesUpdate?: () => void;
}

export function NotesModal({
	isOpen,
	onClose,
	item,
	type,
	onNotesUpdate,
}: NotesModalProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [notes, setNotes] = useState("");
	const [savedNotes, setSavedNotes] = useState("");
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		setNotes(item.notes || "");
		setSavedNotes("");
		setIsEditing(false);
	}, [item]);

	if (!item) return null;

	const isBook = type === "book";
	const book = isBook ? (item as Book) : null;
	const movie = !isBook ? (item as Movie) : null;

	const handleEditClick = () => {
		setNotes(currentNotes);
		setIsEditing(true);
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			const success = isBook
				? await updateBookNotes(item.id, notes)
				: await updateMovieNotes(item.id, notes);

			if (success) {
				setSavedNotes(notes);
				setIsEditing(false);
				onNotesUpdate?.();
			}
		} catch (error) {
			console.error("Error saving notes:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		setNotes(currentNotes);
		setIsEditing(false);
	};

	// Get the current notes to display
	const currentNotes = savedNotes || item.notes;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						<div className="flex-shrink-0">
							{(isBook ? book?.coverUrl : movie?.posterUrl) ? (
								<img
									src={
										(isBook
											? book?.coverUrl
											: movie?.posterUrl) || ""
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
											i <
											Math.floor(
												Number.parseFloat(
													item.rating || "0",
												),
											)
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
						<div className="mb-2 flex items-center justify-between">
							<h3 className="flex items-center gap-2 font-semibold">
								<User className="h-4 w-4" />
								My Notes
							</h3>
							{!isEditing && (
								<Button
									variant="outline"
									size="sm"
									onClick={handleEditClick}
									className="flex items-center gap-1"
								>
									<Edit3 className="h-3 w-3" />
									Edit
								</Button>
							)}
						</div>

						{isEditing ? (
							<div className="space-y-3">
								<textarea
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									className="min-h-32 w-full resize-y rounded-lg border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-gray-800"
									placeholder="Add your thoughts, favorite quotes, or anything you want to remember about this item..."
								/>
								<div className="flex justify-end gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={handleCancel}
										disabled={isSaving}
									>
										<X className="mr-1 h-3 w-3" />
										Cancel
									</Button>
									<Button
										size="sm"
										onClick={handleSave}
										disabled={isSaving}
									>
										<Save className="mr-1 h-3 w-3" />
										{isSaving ? "Saving..." : "Save"}
									</Button>
								</div>
							</div>
						) : (
							<div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
								<p className="whitespace-pre-wrap text-sm leading-relaxed break-words">
									{currentNotes ||
										"No notes yet. Click Edit to add your thoughts!"}
								</p>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
