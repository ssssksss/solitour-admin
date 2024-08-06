import { NextResponse } from "next/server";

export function GET() {
  try {
    const clientId = process.env.KAKAO_REST_API_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format

    if (!clientId || !redirectUri) {
      return NextResponse.redirect("/auth/signin");
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&timestamp=${timestamp}`;
    return NextResponse.redirect(kakaoAuthUrl);
  } catch (error) {
    return NextResponse.redirect("/auth/signin");
  }
}
