"use client"

import useAuthStore from "@/store/authStore";
import { QnADetailType, QnAMessageType } from "@/types/QnADto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Image from "next/image";
import { useEffect, useState } from "react";
import SupportQnADetailEdit from "./SupportQnADetailEdit";

interface IQnAResponseModal {
  closeModal: () => void;
  QnAInfo: {
    id: number;
    userNickname: string;
  };
}
const QnAResponseModal = ({ closeModal, QnAInfo }: IQnAResponseModal) => {
  const authStore = useAuthStore();
  const [content, setContent] = useState("");
  const [qnaMessageList, setQnaMessageList] = useState<QnAMessageType[]>([]);
  const [data, setData] = useState<QnADetailType>();

  const getQnAMessages = async () => {
    const response = await fetch(`/api/qna/detail?id=${QnAInfo.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    setQnaMessageList(data.qnaMessages || []);
    setData(data);
  };

  const changeInputHandler = (value: string) => {
    setContent(value);
  };

  const answerSubmitHandler = async () => {
    if (!content.trim()) {
      alert("답변 내용을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetchWithAuth(`/api/qna`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          qnaId: QnAInfo.id,
        }),
      });
      if (!response.ok) {
        throw new Error("서버에 요청하는 중 오류가 발생했습니다.");
      }

      const result: QnAMessageType = await response.json();
      setQnaMessageList((prev) => [...prev, result]);
    } catch (error) {
      alert("답변 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    getQnAMessages();
  }, []);

  return (
    <div
      className={
        "relative h-full max-h-[calc(100vh-60px)] w-[calc(100vw-1rem)] max-w-[60rem] overflow-y-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem]"
      }
    >
      <button
        className="absolute right-[1rem] top-[1.5rem]"
        onClick={() => closeModal()}
      >
        <Image
          src={"/images/icon/icon-close.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      {data && (
        <SupportQnADetailEdit
          data={data}
          qnaMessageList={qnaMessageList}
          userId={authStore.id}
          userNickname={QnAInfo.userNickname}
          changeInputHandler={changeInputHandler}
          answerSubmitHandler={answerSubmitHandler}
        />
      )}
    </div>
  );
};
export default QnAResponseModal