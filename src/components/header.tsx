import { ModeToggle } from "@/components/mode-toggle";
import FullLogo from "@/components/full-logo";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleGoogleOAuthLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div className="max-w-3xl mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 md:top-2 flex justify-between items-center p-2 border-b md:border md:rounded-4xl shadow-md md:shadow-xl shadow-primary/20 z-10 font-custom-sans">
      <div className="pl-2">
        <FullLogo />
      </div>
      <div className="w-sm mx-1">
        <Link to="/all-topics">
          <Button variant="link" className="text-foreground/30">
            Browse
          </Button>
        </Link>
        <Link to="/generate-lessons">
          <Button variant="link" className="text-foreground/30">
            Generate
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Button
            variant="outline"
            className="text-xs w-[80px]"
            onClick={() => logout()}
          >
            Log out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-xs w-[80px]"
            onClick={handleGoogleOAuthLogin}
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
