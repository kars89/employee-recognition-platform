"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Icons } from "@/components/icons";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle the error message from the URL if it exists
  const errorFromUrl = searchParams.get("error");
  
  useEffect(() => {
    if (errorFromUrl) {
      if (errorFromUrl === "OAuthCallback") {
        setError("There was a problem with the Auth0 sign-in. Please try again.");
      } else if (errorFromUrl === "OAuthAccountNotLinked") {
        setError("The email on your social account is already associated with another account.");
      } else if (errorFromUrl === "AccessDenied") {
        setError("You do not have permission to sign in.");
      } else {
        setError("An error occurred during sign-in. Please try again.");
      }
    }
  }, [errorFromUrl]);

  async function handleAuth0SignIn() {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signIn("auth0", {
        callbackUrl,
        redirect: true
      });
      
      // This won't be reached if redirect is true, but kept for future flexibility
      if (!result?.error) {
        router.push(callbackUrl);
      } else {
        setError("Authentication failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Button
              variant="outline"
              type="button"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleAuth0SignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Icons.auth0 className="h-5 w-5" />
              )}
              {isLoading ? "Signing in..." : "Sign in with Auth0"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

