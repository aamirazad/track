"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		await signIn.email(
			{
				email,
				password,
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onResponse: () => {
					router.push("/app");
				},
			},
		);
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
				className="w-full max-w-md border-none"
				style={{
					background: `
          radial-gradient(
            circle at var(--x, 0%) var(--y, 0%), 
            rgba(0,0,0,0.6) 0%, 
            rgba(0,0,0,0.6) 15%, 
            oklch(0.208 0.042 265.755) 100%
          )
        `,
				}}
			>
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Sign In
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
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
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>

							<Input
								id="password"
								type="password"
								placeholder="password"
								autoComplete="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={loading}
							onClick={handleSubmit}
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								<p> Login </p>
							)}
						</Button>
						<div className="w-full text-center font-slate">
							Don't have an account?{" "}
							<Link className="Link" href="/sign-up">
								Create an account
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
