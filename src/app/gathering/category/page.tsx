import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryContainer from "@/containers/gathering/CategoryContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "모임 카테고리",
  description: "모임 카테고리",
};

async function fetchData() {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/categories/gathering`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      return res.json();
    } catch (error) {
      throw new Error("Internal Server Error");
    }
}

export default async function Home() {
  const categoriesData = await fetchData();
  
  return (
    <DefaultLayout>
        <CategoryContainer categories={categoriesData} />
    </DefaultLayout>
  );
}
