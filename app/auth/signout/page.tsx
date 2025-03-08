"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Sign Out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You will need to sign in again to access your account and personal information.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()} disabled={isSigningOut}>
            Cancel
          </Button>
          <Button onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

