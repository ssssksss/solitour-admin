import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignInContainer from "@/containers/auth/SignInContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "Solitour 사용자 로그인 페이지",
};

export default function page() {
  return (
          <DefaultLayout>
            <div className="flex justify-center items-center w-full h-[calc(100vh-10rem)]">
            <SignInContainer />
            </div>
          </DefaultLayout>
  );
}
