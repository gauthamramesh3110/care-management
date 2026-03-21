"use client";

import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const handleSignIn = () => {
    // Redirect to the backend route that initiates the MSAL flow
    window.location.href = "/api/auth/signin";
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-gray-600">Please sign in with your Microsoft account to continue.</p>
        <Button onClick={handleSignIn} className="w-full">
          Sign In with Microsoft Entra
        </Button>
      </div>
    </div>
  );
}