"use client"

import { NoticeType } from '@/types/NoticeDto';
import { format } from "date-fns";
import UpdateDeleteButtonComponent from '../common/UpdateDeleteButtonComponent';

interface ISupportNoticeDetail {
  data: NoticeType;
  deleteHandler: () => void;
}

const SupportNoticeDetail = ({ data, deleteHandler }: ISupportNoticeDetail) => {
  const categoryStyles: { [key: string]: string } = {
    이벤트: "bg-green-100 text-green-800",
    공지: "bg-blue-100 text-blue-800",
    점검: "bg-yellow-100 text-yellow-800",
    기타: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] w-full flex-col rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`inline-block rounded px-3 py-1 text-sm font-semibold ${categoryStyles[data.categoryName]}`}
        >
          {data.categoryName}
        </div>

        <div className="text-sm text-gray-500">
          {format(new Date(data.createdAt), "yyyy-MM-dd")}
        </div>
      </div>

      <div className="grid w-full grid-cols-[1fr_auto] gap-x-4 text-2xl font-bold">
        <div className="word-break flex flex-wrap whitespace-normal break-words break-all">
          {data.title}
        </div>
        {
          data.isDeleted == true ? 
          <div className={`bg-red-400 p-1 rounded-lg text-white`}> 삭제처리 </div>
          :
          <UpdateDeleteButtonComponent
          userId={1}
          updateHref={`/service/notice/update/${data.id}`}
          deleteHandler={() => deleteHandler()}
          />
        }
      </div>

      <hr className="my-4 border-t-2 border-gray-200" />

      <div className="flex w-full flex-nowrap text-gray-800">
        <div className="overflow-wrap break-word w-full break-words">
          {data.content}
        </div>
      </div>
    </div>
  );
};

export default SupportNoticeDetail;


