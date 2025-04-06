import { ModeToggle } from "@/components/mode-toggle";
import FullLogo from "@/components/full-logo";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

function Header() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 md:top-2 flex justify-between items-center p-2 border-b md:border md:rounded-4xl shadow-md md:shadow-xl shadow-primary/20 z-10">
      <div className="pl-2">
        <FullLogo />
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => logout()}
          >
            Log out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => login()}
          >
            Sign In
          </Button>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
