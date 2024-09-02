"use client"

import SupportNoticeDetail from "@/components/support/SupportNoticeDetail";
import { NoticeType } from "@/types/NoticeDto";
import { useRouter } from "next/navigation";

interface ISupportNoticeDetailContainer {
  data: NoticeType; 
  }
const SupportNoticeDetailContainer = ({data}: ISupportNoticeDetailContainer) => {
    const router = useRouter();

    const deleteHandler = async () => {
      try {
          const response = await fetch(`/api/notice?id=${data.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to create the notice");
          }
        router.replace(`/service/notice`);
        router.refresh();
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
  return <SupportNoticeDetail data={data} deleteHandler={deleteHandler} />;
};
export default SupportNoticeDetailContainer