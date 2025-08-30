"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { authClient, signIn } from "@/lib/auth-client";

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { data: session } = authClient.useSession();

	useEffect(() => {
		if (session) {
			router.push("/dashboard");
		}
	}, [session, router.push]);

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
					router.push("/dashboard");
				},
			},
		);
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
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
					</div>
				</CardContent>
				<CardFooter>
					<div className="flex w-full justify-center border-t py-4">
						<p className="text-center text-neutral-500 text-xs">
							built with{" "}
							<Link
								href="https://better-auth.com"
								className="underline"
								target="_blank"
							>
								<span className="cursor-pointer dark:text-white/70">
									better-auth.
								</span>
							</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
