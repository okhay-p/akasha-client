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

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>

          {/* MAIN SECTION */}
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
