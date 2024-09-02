import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
  const cookie = request.cookies.get("refresh_token");
  if (!cookie) {
    return new NextResponse("Access token not found", { status: 401 });
    }
    // 액세스 토큰 재요청
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/auth/oauth2/token/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: `${cookie?.name}=${cookie?.value}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        credentials: "include",
      },
    )
    const result = new NextResponse(backendResponse.status == 200 ? "성공" : "실패", {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json" },
    });
    if (backendResponse.status == 200) {
      const accessToken = backendResponse.headers.get("set-cookie");
      result.headers.set("set-cookie", accessToken as string);
    }
    return result;
  } catch (error) {
    return new NextResponse("살려줘" , { status: 500 });
  }
}
