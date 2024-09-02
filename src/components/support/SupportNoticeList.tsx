import { NoticeType } from "@/types/NoticeDto";
import { format } from "date-fns";
import Link from "next/link";

interface ISupportNoticeList {
  data: NoticeType[];
}


  const categoryStyles: {[key: string]: string} = {
    이벤트: "bg-green-100 text-green-800",
    공지: "bg-blue-100 text-blue-800",
    점검: "bg-yellow-100 text-yellow-800",
    기타: "bg-gray-100 text-gray-800",
  };

const SupportNoticeList = ({ data }: ISupportNoticeList) => {

  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      <div className="flex w-full justify-end">
        <Link
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-white shadow-lg transition duration-300 "
          href={"/service/notice/create"}
        >
          공지사항 등록
        </Link>
      </div>
      {data.map((notice) => (
        <Link
          href={`/service/notice/${notice.id}`}
          key={notice.id}
          className={`flex flex-col gap-y-2 rounded-lg border border-gray-200 p-4 shadow-sm hover:bg-primary-4 hover:text-white ${notice.isDeleted ? "bg-gray-4 text-black" : "bg-white "}`}
        >
          <div
            className={`${categoryStyles[notice.categoryName]} max-w-fit rounded-lg px-2`}
          >
            {notice.categoryName}
          </div>
          <h2 className="mb-2 text-xl font-semibold">{notice.title}</h2>
          <p className="mb-2 text-sm ">
            {format(new Date(notice.createdAt), "yyyy-MM-dd")}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SupportNoticeList;
