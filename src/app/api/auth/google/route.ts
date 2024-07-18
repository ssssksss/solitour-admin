import { NextResponse } from "next/server";

export function GET() {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&scope=email profile&prompt=select_account`;
  return NextResponse.redirect(googleAuthUrl);
}
