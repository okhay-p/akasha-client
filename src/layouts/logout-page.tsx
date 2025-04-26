import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LogoutPage() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const logoutUrl = import.meta.env.VITE_API + "/logout";
    const redirectUrl = "akashalearn.org";

    window.location.href = `${logoutUrl}?redirect_uri=${redirectUrl}`;

    // Fallback in case the redirect doesn't happen
    const timer = setTimeout(() => {
      setIsLoggingOut(false);
      setError(
        "Logout is taking longer than expected. You may close this window.",
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Logging Out</CardTitle>
          <CardDescription>
            Please wait while we securely log you out...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {isLoggingOut ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                You'll be redirected automatically
              </p>
            </>
          ) : (
            <>
              <div className="text-destructive">{error}</div>
              <Button onClick={handleManualRedirect}>
                Return to Homepage
              </Button>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            If you're not redirected in a few seconds, click the button
            above.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
