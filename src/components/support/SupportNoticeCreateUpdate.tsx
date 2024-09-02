import React from "react";

interface ISupportNoticeCreateUpdate {
  noticeCategory: string;
  noticeTitle: string;
  noticeContent: string;
  setNoticeCategory: (type: string) => void;
  setNoticeTitle: (title: string) => void;
  setNoticeContent: (content: string) => void;
  onSubmit: (type: string, title: string, content: string) => void;
  isEdit: boolean;
}

const SupportNoticeCreateUpdate: React.FC<ISupportNoticeCreateUpdate> = ({
  noticeCategory,
  noticeTitle,
  noticeContent,
  setNoticeCategory,
  setNoticeTitle,
  setNoticeContent,
  onSubmit,
  isEdit,
}) => {
  return (
    <div className="flex w-full flex-col space-y-6 rounded-xl bg-gray-50 p-8 shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        {isEdit ? "공지사항 수정" : "공지사항 작성"}
      </h2>

      <div className="relative">
        <select
          value={noticeCategory}
          onChange={(e) => setNoticeCategory(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3  pr-8 leading-tight transition duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">공지 유형 선택</option>
          <option value="이벤트">이벤트</option>
          <option value="공지">공지</option>
          <option value="점검">점검</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="w-full rounded-lg border border-gray-300 px-4 py-3  transition duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        value={noticeTitle}
        onChange={(e) => setNoticeTitle(e.target.value)}
      />

      <textarea
        placeholder="공지사항 내용을 입력하세요"
        className="min-h-[320px] w-full resize-none rounded-lg border border-gray-300 p-4 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        value={noticeContent}
        onChange={(e) => setNoticeContent(e.target.value)}
      />

      <button
        className="w-full transform rounded-lg bg-primary px-4 py-3  font-bold text-white transition duration-200 ease-in-out hover:-translate-y-1 hover:bg-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => onSubmit(noticeCategory, noticeTitle, noticeContent)}
      >
        {isEdit ? "수정 완료" : "작성 완료"}
      </button>
    </div>
  );
};

export default SupportNoticeCreateUpdate;
