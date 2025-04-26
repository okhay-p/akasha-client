import { ModeToggle } from "@/components/mode-toggle";
import FullLogo from "@/components/full-logo";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import googleLogo from "@/assets/google-logo.svg";
import { LogOut } from "lucide-react";

function Header() {
  const { isAuthenticated, login, logout, userData } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 md:top-2 flex justify-between items-center p-2 border-b md:border md:rounded-4xl shadow-md md:shadow-xl shadow-primary/20 z-10 font-custom-sans">
      <div className="pl-2">
        <FullLogo />
      </div>

      <div className="w-sm mx-1 flex gap-3 text-sm">
        {/* <NavLink
          to="/all-topics"
          className={({ isActive }) =>
            isActive ? "text-foreground" : "text-foreground/30"
          }
        >
          Browse
        </NavLink> */}
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            isActive ? "text-foreground" : "text-foreground/30"
          }
        >
          Feedback
        </NavLink>
        <NavLink
          hidden={!isAuthenticated}
          to="/generate-lessons"
          className={({ isActive }) =>
            isActive ? "text-foreground" : "text-foreground/30"
          }
        >
          Dashboard
        </NavLink>
      </div>
      <div className="flex flex-row-reverse items-center gap-2">
        <ModeToggle />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center text-lg my-2 rounded-xl py-1 px-3 hover:bg-muted hover:cursor-pointer">
                <Avatar className="border-border border-1 size-7 shadow-sm mr-1">
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
        ) : (
          <Button variant="outline" className="text-xs" onClick={login}>
            <div className="flex gap-1 items-center">
              <img className="size-7" src={googleLogo} />
              Sign In
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
