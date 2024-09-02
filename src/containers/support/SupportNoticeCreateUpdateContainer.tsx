"use client";

import SupportNoticeCreateUpdate from "@/components/support/SupportNoticeCreateUpdate";
import { NoticeType } from "@/types/NoticeDto";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ISupportNoticeCreateContainerBase {
  isEdit?: false;
}

interface ISupportNoticeEditContainer {
  isEdit: true;
  data: NoticeType;
}

type ISupportNoticeCreateContainer =
  | ISupportNoticeCreateContainerBase
  | ISupportNoticeEditContainer;

const SupportNoticeCreateUpdateContainer: React.FC<
  ISupportNoticeCreateContainer
> = (props) => {
  const [noticeCategory, setNoticeCategory] = useState<string>(props.isEdit ? props.data.categoryName : "");
  const [noticeTitle, setNoticeTitle] = useState<string>(
    props.isEdit ? props.data.title : "",
  );
  const [noticeContent, setNoticeContent] = useState<string>(
    props.isEdit ? props.data.content : "",
  );
  const router = useRouter();
  const handleSubmit = async (
    category: string,
    title: string,
    content: string,
  ) => {

    try {
      if (props.isEdit && props.data) {
            const requestBody = {
              category,
              title,
              content,
              id: props.data.id
            };
        const response = await fetch(`/api/notice`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to update the notice");
        }
          router.replace(`/service/notice/${props.data.id}`);
          // validate가 안되는 문제 해결
          router.refresh();
          // 뒤로가기를 2번해야 원하는 이전페이지로 가게 되므로 여기서 히스토리를 1개 제거
          router.back();
      } else {
            const requestBody = {
              category,
              title,
              content,
            };
        const response = await fetch("/api/notice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to create the notice");
        }
        const id = await response.json();
        router.replace(`/service/notice/${id}`)

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SupportNoticeCreateUpdate
      noticeCategory={noticeCategory}
      noticeTitle={noticeTitle}
      noticeContent={noticeContent}
      setNoticeCategory={setNoticeCategory}
      setNoticeTitle={setNoticeTitle}
      setNoticeContent={setNoticeContent}
      onSubmit={handleSubmit}
      isEdit={props.isEdit || false}
    />
  );
};

export default SupportNoticeCreateUpdateContainer;
