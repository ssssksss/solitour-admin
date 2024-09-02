import { QnADetailType, QnAMessageType } from "@/types/QnADto";
import { format } from "date-fns";
import React from "react";

interface ISupportQnADetailEdit {
  data: QnADetailType;
  userId: number; // 현재 로그인한 사용자의 ID
  userNickname: string; // 질문한 사용자의 닉네임
  changeInputHandler: (value: string) => void;
  answerSubmitHandler: () => void;
  qnaMessageList: QnAMessageType[];
}

const SupportQnADetailEdit: React.FC<ISupportQnADetailEdit> = ({
  data,
  userId,
  userNickname,
  changeInputHandler,
  answerSubmitHandler,
  qnaMessageList,
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
  };

  const STATUS: { [key: string]: { name: string; style: string } } = {
    WAIT: {
      name: "답변 대기 중",
      style: "bg-red-100 text-red-700",
    },
    ANSWER: {
      name: "답변 완료",
      style: "bg-green-100 text-green-700",
    },
    CLOSED: {
      name: "답변 종료",
      style: "bg-gray-400 text-black",
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 rounded-[.25rem] bg-white p-6 ">
        <div className="mb-4 text-center">
          <h2 className="text-main text-4xl font-bold">{data.title}</h2>
        </div>
        <div className="text-center">
          <span
            className={`rounded-lg px-4 py-1 text-xl font-medium ${STATUS[data.status].style}`}
          >
            {STATUS[data.status].name}
          </span>
        </div>
      </div>

      <div className="mb-8 space-y-6">
        {qnaMessageList.map((entry) => (
          <div
            key={entry.id}
            className={`flex ${entry.userId != userId ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-md outline outline-[2px] outline-offset-[-2px] ${entry.userId === userId ? "outline-gray-800" : "outline-orange-400"}`}
            >
              <div className="flex h-[2rem] min-w-[2rem] max-w-fit items-center justify-center rounded-lg bg-primary px-2 text-white">
                {entry.userId != userId ? `Q - ${userNickname}` : "A"}
              </div>
              <p className="text-gray-700">{entry.content}</p>
              <p className="mt-2 text-right text-sm text-gray-500">
                {formatDate(entry.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.status !== "CLOSED" && (
        <div className="space-y-4">
          <div className="outline-main rounded-[2rem] bg-white p-6 shadow-md outline outline-[1px] outline-offset-[-1px]">
            <textarea
              rows={4}
              className="mb-4 w-full resize-none rounded-lg p-4 focus:outline-none"
              placeholder="여기에 응답을 작성하세요..."
              onChange={(e) => changeInputHandler(e.target.value)}
            />
            <button
              onClick={() => answerSubmitHandler()}
              className="w-full rounded-lg bg-primary py-2 font-semibold text-white transition duration-200 hover:bg-primary-dark"
            >
              응답 제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportQnADetailEdit;
