import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useAuth } from "@/contexts/AuthContext";

import { Outlet, Navigate } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />

        <SidebarInset className="overflow-x-hidden">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="mt-[48px]">
            {/* MAIN SECTION */}
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
