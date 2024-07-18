import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryContainer from "@/containers/information/CategoryContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "정보 카테고리",
  description: "정보 카테고리",
};

export default function Home() {
  return (
    <DefaultLayout>
      <CategoryContainer />
    </DefaultLayout>
  );
}
