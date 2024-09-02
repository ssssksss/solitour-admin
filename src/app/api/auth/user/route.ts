import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const access_cookie = request.cookies.get("access_token");
  if (!access_cookie) {
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      // 리프레시 토큰이 없으므로 요청 중단
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    // 리프레시 토큰으로 재발급 받아 재요청 보내기 위한 응답
    return new NextResponse("Refresh token not found", { status: 401 });
  }

  // 사용자 정보 조회 API
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/info`, {
    method: "GET",
    headers: {
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    cache: "no-store",
  });

  if (response.ok) {
    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  }

  if (response.status == 401) {
    return new NextResponse("토큰 만료", {
      status: 401,
    });
  }

  cookies().delete("access_token");
  cookies().delete("refresh_token");
  return new NextResponse("서버 에러", {
    status: 500,
  });
}
