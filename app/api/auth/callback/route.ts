import { NextResponse } from "next/server";
import { getMsalApp } from "@/lib/msal";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback`;

  if (!code) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  const tokenRequest = {
    code,
    scopes: ["user.read"],
    redirectUri: redirectUri,
  };

  try {
    const response = await getMsalApp().acquireTokenByCode(tokenRequest);
    
    // Set an authentication cookie to be consumed by the middleware
    const cookieStore = await cookies();
    cookieStore.set("isAuthenticated", "true", { path: "/" });
    if (response?.account?.username) {
        cookieStore.set("userEmail", response.account.username, { path: "/" });
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(new URL("/auth/signin?error=auth_failed", request.url));
  }
}
