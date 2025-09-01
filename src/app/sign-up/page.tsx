"use client";

import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
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

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const mouseX = e.clientX / window.innerWidth; // 0 → 1
			const mouseY = e.clientY / window.innerHeight; // 0 → 1

			// Scale it down so the gradient moves less
			// Example: only move in the range [0%, 50%]
			const scaledX = mouseX * 50;
			const scaledY = mouseY * 50;

			if (ref.current) {
				ref.current.style.setProperty("--x", `${scaledX}%`);
				ref.current.style.setProperty("--y", `${scaledY}%`);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="flex flex-1 items-center justify-center">
			<Card
				ref={ref}
				className="relative w-full max-w-md overflow-hidden bg-[radial-gradient(circle_at_var(--x)_var(--y),hsl(0_0%_100%/0.95)_0%,hsl(210_40%_99%/0.9)_8%,hsl(213_63%_96%/0.95)_18%,hsl(219_60%_93%/0.95)_32%,hsl(226_55%_90%/0.95)_48%,hsl(230_55%_86%/0.95)_66%,hsl(235_55%_82%)_100%)] ring-1 ring-slate-200/50 transition-[background-position] duration-300 [--x:50%] [--y:50%] dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.08)_12%,rgba(255,255,255,0.05)_22%,oklch(0.208_0.042_265.755)_100%)] dark:ring-0"
			>
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Sign Up
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
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
						<div className="grid gap-2">
							<Label htmlFor="image">
								Profile Image (optional)
							</Label>
							<div className="flex items-end gap-4">
								{imagePreview && (
									<div className="relative h-16 w-16 overflow-hidden rounded-sm">
										<Image
											src={imagePreview}
											alt="Profile preview"
											layout="fill"
											objectFit="cover"
										/>
									</div>
								)}
								<div className="flex w-full items-center gap-2">
									<Input
										id="image"
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="w-full"
									/>
									{imagePreview && (
										<X
											className="cursor-pointer"
											onClick={() => {
												setImage(null);
												setImagePreview(null);
											}}
										/>
									)}
								</div>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
							onClick={async () => {
								await signUp.email({
									email,
									password,
									name: `${firstName} ${lastName}`,
									image: image
										? await convertImageToBase64(image)
										: "",
									callbackURL: "/app",
									fetchOptions: {
										onResponse: () => {
											setLoading(false);
										},
										onRequest: () => {
											setLoading(true);
										},
										onError: (ctx) => {
											toast.error(ctx.error.message);
										},
										onSuccess: async () => {
											router.push("/app");
										},
									},
								});
							}}
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
					</div>
				</CardContent>
				<CardFooter>
					<div className="flex w-full justify-center border-t py-4">
						<p className="text-center text-neutral-500 text-xs">
							Secured by{" "}
							<span className="font-bold">better-auth.</span>
						</p>
					</div>
				</CardFooter>
			</Card>
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
