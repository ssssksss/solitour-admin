import { NextRequest, NextResponse } from "next/server";

/**
 * qna 상세페이지 조회
 */
export async function GET(request: NextRequest) {
  const access_cookie = request.cookies.get("access_token");

  if (!access_cookie) {
    const refresh_cookie = request.cookies.get("refresh_token");
    if (!refresh_cookie) {
      return new NextResponse("Refresh token not found", { status: 403 });
    }
    return new NextResponse("Access token not found", { status: 401 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const response = await fetch(`${process.env.BACKEND_URL}/api/qna/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
    },
    cache: "no-store",
  });

  return response;
}
