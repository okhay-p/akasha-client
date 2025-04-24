import { useEffect, useState } from "react";
import FullLogo from "@/components/full-logo";

import { LogOut, RotateCw, ScanEye, Sparkles } from "lucide-react";

import { NavMyTopics } from "@/components/nav-my-topics";
import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import api from "@/util/interceptor";

import { useAuth } from "@/contexts/AuthContext";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Generate Lessons",
      url: "/generate-lessons",
      icon: Sparkles,
    },
    {
      title: "Browse",
      url: "/all-topics",
      icon: ScanEye,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Log Out",
      url: "/",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [myTopics, setMyTopics] = useState([]);

  const { logout } = useAuth();

  const fetchMyTopics = async () => {
    try {
      const res = await api.get("/topic/progress");
      setMyTopics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyTopics();
  }, []);

  return (
    <Sidebar className="border-r-0 font-custom" {...props}>
      <SidebarHeader>
        <div className="flex justify-between align-center pt-2 pl-2">
          <FullLogo />
          <ModeToggle />
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavMyTopics topics={myTopics} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                key="refresh"
                className="hover:cursor-pointer"
                onClick={() => {
                  fetchMyTopics();
                }}
              >
                <SidebarMenuButton asChild>
                  <div>
                    <RotateCw />
                    <span>Refresh My Topics</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem
                key="logout"
                className="hover:cursor-pointer"
                onClick={() => {
                  logout();
                }}
              >
                <SidebarMenuButton asChild>
                  <div>
                    <LogOut />
                    <span>Log out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
