import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const access_cookie = request.cookies.get("access_token");
    // 사용자 정보 조회 API
    await fetch(`${process.env.BACKEND_URL}/api/auth/oauth2/logout`, {
      method: "POST",
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return new NextResponse("로그아웃", { status: 200 });
  } catch (error) {
    console.error(error);
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
