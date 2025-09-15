"use client";

import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			{/** biome-ignore lint/a11y/noStaticElementInteractions: replace with shadcn */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: replace with shadcn */}
			<div
				className="fixed inset-0 bg-black/50"
				onClick={() => onOpenChange?.(false)}
			/>
			{children}
		</div>
	);
};

const DialogContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg",
			className,
		)}
		{...props}
	>
		{children}
	</div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h2
		ref={ref}
		className={cn(
			"font-semibold text-lg leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
));
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogContent, DialogHeader, DialogTitle };
