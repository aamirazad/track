"use client";

import { AlertCircleIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthFormWrapper from "@/components/blocks/AuthFormWrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (password !== passwordConfirmation) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			await signUp.email({
				email,
				password,
				name: `${firstName} ${lastName}`,
				image: image ? await convertImageToBase64(image) : "",
				callbackURL: "/app",
				fetchOptions: {
					onResponse: () => {
						setLoading(false);
					},
					onRequest: () => {
						setLoading(true);
					},
					onError: (ctx) => {
						setError(ctx.error.message);
					},
					onSuccess: async () => {
						router.push("/app");
					},
				},
			});
		} catch {
			setError("An unexpected error occurred");
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-1 items-center justify-center">
			<AuthFormWrapper>
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Sign Up
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="grid gap-4">
						{error && (
							<Alert variant={"destructive"}>
								<AlertCircleIcon />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									id="first-name"
									placeholder="Max"
									required
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
									value={firstName}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									id="last-name"
									placeholder="Robinson"
									required
									onChange={(e) => {
										setLastName(e.target.value);
									}}
									value={lastName}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								value={email}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								placeholder="Password"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Confirm Password</Label>
							<Input
								id="password_confirmation"
								type="password"
								value={passwordConfirmation}
								onChange={(e) =>
									setPasswordConfirmation(e.target.value)
								}
								autoComplete="new-password"
								placeholder="Confirm Password"
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={loading}
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Create an account"
							)}
						</Button>
						<div className="w-full text-center font-slate">
							Already have an account?{" "}
							<Link className="Link" href="/sign-in">
								Sign in
							</Link>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<div className="flex w-full justify-center border-t py-4">
						<p className="text-center text-neutral-500 text-xs">
							Secured by{" "}
							<span className="font-bold">better-auth.</span>
						</p>
					</div>
				</CardFooter>
			</AuthFormWrapper>
		</div>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
