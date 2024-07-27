import { NextResponse } from "next/server";

export function GET() {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}`;
    if (
      !process.env.KAKAO_REST_API_KEY ||
      !process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
    ) {
      return new Response("Environment variables are not set correctly", {
        status: 500,
      });
    }
  return NextResponse.redirect(kakaoAuthUrl);
}
