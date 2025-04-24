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
import googleLogo from "@/assets/google-logo.svg";

function Header() {
  const { isAuthenticated, login, userData } = useAuth();

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
          <Avatar
            // onClick={() => logout()}
            className="border-border border-1 size-9 shadow-sm"
          >
            <AvatarImage src={userData?.picture_url} />
            <AvatarFallback>{userData?.email[0]}</AvatarFallback>
          </Avatar>
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
