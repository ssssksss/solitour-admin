// app/page.tsx
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SupportNoticeDetailContainer from "@/containers/support/SupportNoticeDetailContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "공지사항 상세조회",
  description: "공지사항 상세조회",
};

interface PageProps {
  params: { id: string };
}

async function fetchData(id: number) {
  const cookie = cookies().get("access_token");

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/notice/admin/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const noticeId = Number(id);
  if (noticeId <= 0 || !Number.isSafeInteger(noticeId)) {
    throw Error("Not Found");
  }

  const data = await fetchData(noticeId);

  return (
    <DefaultLayout>
      <SupportNoticeDetailContainer data={data} />
    </DefaultLayout>
  );
}
