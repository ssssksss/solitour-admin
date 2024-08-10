"use client";

import AuthLoading from "@/components/Auth/AuthLoading";
import useAuthStore from "@/store/authStore";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGoogleContainer = () => {
  const router = useRouter();
  const authStore = useAuthStore();

    useEffect(() => {
        const _queryStringObject = UrlQueryStringToObject<{
          [key: string]: string;
        }>(window.location.href);
        const googleLogin = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth2/login?type=google&redirectUrl=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&code=${_queryStringObject?.code}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  "Access-Control-Allow-Origin": "*",
                },
                credentials: "include",
              },
            );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // const res = await response.json();
        // res.accessToken 받아서 사용자 정보 받아오고 홈으로 이동
        authStore.setUser({ nickname: "성공" });
        router.push("/");
      } catch (error) {
        console.error("로그인 실패", error);
        router.push("/auth/signin");
      }
    };

    googleLogin();
  }, []);

  return <AuthLoading />;
};

export default AuthGoogleContainer;
