import { CircleMinus, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { AlertDialog } from "./ui/alert-dialog";

export function NavMyTopics({
  topics,
  deleteProgress,
}: {
  topics: {
    title: string;
    id: string;
    emoji: string;
  }[];
  deleteProgress: (id: string) => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Topics</SidebarGroupLabel>
      <SidebarMenu>
        {topics.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavLink to={"/topic/" + item.id}>
              {({ isActive }) => (
                <SidebarMenuButton
                  isActive={isActive}
                  className="hover:cursor-pointer"
                >
                  <span>{item.emoji}</span>
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => {
                    deleteProgress(item.id);
                  }}
                >
                  <CircleMinus className="text-muted-foreground" />
                  <span>Remove from My Topics</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
