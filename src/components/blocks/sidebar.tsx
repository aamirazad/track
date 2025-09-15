import { BookOpen, Film, Home, Search, Settings } from "lucide-react";
import Link from "next/link";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
	{
		title: "Dashboard",
		url: "/app",
		icon: Home,
	},
	{
		title: "Books",
		url: "/app/books",
		icon: BookOpen,
	},
	{
		title: "Movies",
		url: "/app/movies",
		icon: Film,
	},
	{
		title: "Search",
		url: "/app/search",
		icon: Search,
	},
	{
		title: "Settings",
		url: "/app/settings",
		icon: Settings,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<span className="p-6" />
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
