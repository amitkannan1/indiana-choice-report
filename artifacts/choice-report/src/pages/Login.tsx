import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCurrentAuthUser } from "@workspace/api-client-react";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [, setLocation] = useLocation();
  const { data: auth, isLoading } = useGetCurrentAuthUser();

  useEffect(() => {
    if (!isLoading) {
      if (auth?.isAuthenticated && auth.user?.isAdmin) {
        setLocation("/admin");
      } else if (auth?.isAuthenticated && !auth.user?.isAdmin) {
        // Logged in but not admin
      } else if (!auth?.isAuthenticated) {
        window.location.href = "/api/login?returnTo=/admin";
      }
    }
  }, [auth, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (auth?.isAuthenticated && !auth.user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You are authenticated as {auth.user?.username}, but you do not have administrative privileges for this portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4">
            <Button onClick={() => setLocation("/")} variant="outline">
              Return to Public Report
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecting to secure login...</p>
      </div>
    </div>
  );
}
