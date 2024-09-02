import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SupportNoticeCreateUpdateContainer from "@/containers/support/SupportNoticeCreateUpdateContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "공지사항 수정",
  description: "공지사항 수정",
};

interface PageProps {
  params: { id: string };
}

  async function fetchData(id: number) {
    const cookie = cookies().get("access_token");

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/notice/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: `${cookie?.name}=${cookie?.value}`,
        },
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
      <SupportNoticeCreateUpdateContainer isEdit={true} data={data} />
    </DefaultLayout>
  );
}
