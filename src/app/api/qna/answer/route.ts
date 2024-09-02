import { NextRequest, NextResponse } from "next/server";

/**
 * answer 등록
 */
export async function POST(request: NextRequest) {
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

      const bodyData = await request.json();
    const url = new URL(request.url);

  const response = await fetch(`${process.env.BACKEND_URL}/api/answer?qnaId=${url.searchParams.get("qnaId")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
    },
    body: JSON.stringify(bodyData),
    cache: "no-store",
  });

  return response;
}
