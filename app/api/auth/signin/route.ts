import { NextResponse } from "next/server";
import { msalApp } from "@/lib/msal";

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/auth/callback`;

  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: redirectUri,
  };

  try {
    const response = await msalApp.getAuthCodeUrl(authCodeUrlParameters);
    return NextResponse.redirect(response);
  } catch (error) {
    console.error("Error generating auth url:", error);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}
