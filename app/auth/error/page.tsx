"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  // Configuration errors
  Configuration: "There is a problem with the server configuration. Contact the administrator.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification link is invalid or has expired.",
  
  // OAuth errors
  OAuthSignin: "Error occurred during OAuth sign-in.",
  OAuthCallback: "Error occurred during OAuth callback.",
  OAuthCreateAccount: "Error occurred while creating your account.",
  OAuthAccountNotLinked: "This account is already linked to another user.",
  
  // Email errors
  EmailCreateAccount: "Error occurred while creating your account.",
  EmailSignin: "Error occurred during email sign-in.",
  
  // Credentials errors
  CredentialsSignin: "The email or password you entered is incorrect.",
  
  // Session errors
  SessionRequired: "You must be signed in to access this page.",
  
  // Default error
  Default: "An unexpected authentication error occurred."
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("Default");
  const [errorDescription, setErrorDescription] = useState<string>("");
  
  useEffect(() => {
    // Extract error type from URL query parameters
    const errorType = searchParams.get("error") || "Default";
    const errorMessage = errorMessages[errorType] || errorMessages.Default;
    
    setError(errorType);
    setErrorDescription(errorMessage);
  }, [searchParams]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>{errorDescription}</AlertDescription>
          </Alert>
          
          {error === "SessionRequired" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You need to be signed in to access this page. Please sign in to continue.
            </p>
          )}
          
          {error === "OAuthAccountNotLinked" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              To confirm your identity, sign in with the same account you used originally.
            </p>
          )}
          
          {error === "Verification" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The verification link may have expired or is invalid. Request a new verification link.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="default">
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

