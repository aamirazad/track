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
				className="relative w-full max-w-md overflow-hidden bg-[radial-gradient(circle_at_var(--x)_var(--y),hsl(0_0%_100%/0.95)_0%,hsl(210_40%_99%/0.9)_8%,hsl(213_63%_96%/0.95)_18%,hsl(219_60%_93%/0.95)_32%,hsl(226_55%_90%/0.95)_48%,hsl(230_55%_86%/0.95)_66%,hsl(235_55%_82%)_100%)] ring-1 ring-slate-200/50 transition-[background-position] duration-300 [--x:50%] [--y:50%] dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.08)_12%,rgba(255,255,255,0.05)_22%,oklch(0.208_0.042_265.755)_100%)] dark:ring-0"
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
