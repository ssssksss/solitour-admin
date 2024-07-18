"use client";

import AuthLoading from "@/components/auth/AuthLoading";
import useAuthStore from "@/store/authStore";
import { userResponseDto } from "@/types/UserDto";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthKaKaoContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();

    useEffect(() => {
        const _queryStringObject = UrlQueryStringToObject<{
          [key: string]: string;
        }>(window.location.href);
        const kakaoLogin = async () => {
          try {
            // 액세스와 리프레시 토큰 발급
            await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth2/login?type=kakao&redirectUrl=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${_queryStringObject?.code}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                credentials: "include",
              },
            );
            // 액세스 토큰을 이용해서 사용자 정보 조회
            const data = await fetch("/api/auth/user");
            if (data.status == 200) {
              data.json().then((res: userResponseDto) => {
                authStore.setUser(res);
              });
              router.push("/");
            }
            else {
              throw "";
            }
      } catch (error) {
        console.error("로그인 실패", error);
        alert("로그인에 실패했습니다.")
        router.push("/auth/signin");
      }
    };

    kakaoLogin();
  }, []);

  return <AuthLoading />;
};

export default AuthKaKaoContainer;
