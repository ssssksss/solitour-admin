import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Query string 파싱
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    // 백엔드에 액세스 토큰 재요청
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth2/login?type=kakao&redirectUrl=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );

    const result = new NextResponse(
      backendResponse.status == 200 ? "성공" : "실패",
      {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      },
    );

    if (backendResponse.status == 200) {
      const cookies = backendResponse.headers.get("set-cookie");
      if (cookies) {
        // 받은 쿠키를 파싱하여 설정
        cookies.split(",").forEach((cookie) => {
          result.headers.append("Set-Cookie", cookie.trim());
        });
      }
    }

    return result;
  } catch (error) {
    return new NextResponse("서버 에러", { status: 500 });
  }
}
