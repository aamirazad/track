"use client";

import { AlertCircleIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await signIn.email({
			email,
			password,
		});
		if (res.error) {
			setError(res.error.message);
		} else {
			redirect("/app");
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-1 items-center justify-center">
			<AuthFormWrapper>
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">
						Sign In
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="grid gap-4">
						{error && (
							<Alert variant={"destructive"}>
								<AlertCircleIcon />
								<AlertDescription> {error}</AlertDescription>
							</Alert>
						)}

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
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Login"
							)}
						</Button>

						<div className="w-full text-center font-slate">
							Don't have an account?{" "}
							<Link className="Link" href="/sign-up">
								Create an account
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
