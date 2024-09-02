import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const access_cookie = request.cookies.get("access_token");
    if (!access_cookie) {
      const refresh_cookie = request.cookies.get("refresh_token");
      if (!refresh_cookie) {
        return new NextResponse("불필요한 요청", { status: 400 });
      }
      return new NextResponse("Access token not found", { status: 401 });
    }
    const params: {
      page: number,
      nickname: string,
    } | undefined = UrlQueryStringToObject(request.url)
    // 사용자 정보 조회 API
    const response = await fetch(`${process.env.BACKEND_URL}/api/admin/user/list?page=${params?.page}&nickname=${params?.nickname}`, {
      method: "GET",
      headers: {
        Cookie: `${access_cookie?.name}=${access_cookie?.value}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
