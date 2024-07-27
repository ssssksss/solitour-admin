import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "정보 대시보드",
  description: "정보 대시보드",
};

export default function Home() {
  return (
    <DefaultLayout>
      정보 대시보드
      {/* <CategoryDashBoardContainer /> */}
    </DefaultLayout>
  );
}
