"use client";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AuthFormWrapper({
	className,
	...props
}: React.ComponentProps<"div">) {
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
		<Card
			ref={ref}
			className={cn(
				"relative mt-25 w-full max-w-md overflow-hidden bg-[radial-gradient(circle_at_var(--x)_var(--y),hsl(0_0%_100%/0.95)_0%,hsl(210_40%_99%/0.9)_8%,hsl(213_63%_96%/0.95)_18%,hsl(219_60%_93%/0.95)_32%,hsl(226_55%_90%/0.95)_48%,hsl(230_55%_86%/0.95)_66%,hsl(235_55%_82%)_100%)] ring-1 ring-slate-200/50 transition-[background-position] duration-300 [--x:50%] [--y:50%] dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.6)_15%,oklch(0.208_0.042_265.755)_100%)] dark:ring-0",
				className,
			)}
			{...props}
		/>
	);
}
