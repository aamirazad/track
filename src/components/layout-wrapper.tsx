"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/blocks/header";
import { AppSidebar } from "@/components/blocks/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAppRoute = pathname.startsWith("/app");

	return (
		<SidebarProvider open={isAppRoute}>
			<div className="flex w-full flex-col">
				<AppSidebar />
				<Header />
				<div className="flex flex-1 flex-col">
					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
