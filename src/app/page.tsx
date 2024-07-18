import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "관리자 페이지 홈",
  description: "관리자 페이지 홈",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        홈
      </DefaultLayout>
    </>
  );
}
