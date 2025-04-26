"use client";

import { LogOut, SidebarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  const { userData, logout } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background font-custom">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="size-8 md:w-auto md:px-2 mr-1"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
          <div className="hidden md:block font-normal -ml-1">
            Ctrl + B
          </div>
        </Button>
        <ModeToggle />
        <Separator orientation="vertical" className="mr-2 h-4" />

        <div className="ml-auto w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center text-lg my-2 rounded-xl py-1 px-3 hover:bg-muted hover:cursor-pointer">
                <Avatar
                  // onClick={() => logout()}
                  className="border-border border-1 size-7 shadow-sm mr-1"
                >
                  <AvatarImage src={userData?.picture_url} />
                  <AvatarFallback>{userData?.email[0]}</AvatarFallback>
                </Avatar>
                {userData?.username}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div
                  className="flex gap-2 items-center"
                  onClick={() => logout()}
                >
                  <LogOut />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
