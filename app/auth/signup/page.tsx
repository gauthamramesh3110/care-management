"use client";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const handleSignUp = () => {
    // Redirect to the backend route that initiates the MSAL flow
    window.location.href = "/api/auth/signin";
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-gray-600">Register using your Microsoft account to get started.</p>
        <Button onClick={handleSignUp} className="w-full">
          Sign Up with Microsoft Entra
        </Button>
        <div className="text-sm mt-4">
          <a href="/auth/signin" className="text-blue-500 hover:underline">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}