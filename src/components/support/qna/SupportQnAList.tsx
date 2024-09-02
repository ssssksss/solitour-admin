import { ModalState } from "@/types/ModalState";
import { format } from "date-fns";

interface QnAElement {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number | string;
  userNickname: string;
}


interface ISupportQnAList {
  elements: QnAElement[];
  searchHandler: () => void;
  sortStatusHandler: (value: string) => void;
  onChangeKeywordHandler: (value: string) => void;
  activeQnAHandler: (id: number, userNickname: string) => void;
  status: string;
  activeKeyword: string;
  modalState: ModalState;
}

const STATUS: { [key: string]: { name: string; style: string } } = {
  WAIT: {
    name: "WAIT",
    style: "bg-red-100 text-red-700",
  },
  ANSWER: {
    name: "ANSWER",
    style: "bg-green-100 text-green-700",
  },
  CLOSED: {
    name: "CLOSED",
    style: "bg-gray-400 text-black",
  },
};

const SupportQnAList = ({
  elements,
  searchHandler,
  sortStatusHandler,
  onChangeKeywordHandler,
  status,
  modalState,
  activeQnAHandler,
}: ISupportQnAList) => {
  return (
    <div className="w-full">
      <section className="flex w-full flex-col gap-2 p-4">
        <div className="flex w-full justify-between py-4">
          <label className="group relative h-[3rem] w-full max-[768px]:w-full min-[745px]:w-full min-[745px]:max-w-[28rem]">
            <input
              className="bg-search-icon placeholder:text-gray2 h-full w-full border-black bg-[length:1rem] bg-[0rem_center] bg-no-repeat pb-1 pl-2 pr-[3.5rem] text-sm outline-none placeholder:font-medium"
              type="text"
              autoComplete="search"
              name="search"
              placeholder="유저 닉네임이나 제목으로 검색해주세요"
              maxLength={30}
              onChange={(e) => onChangeKeywordHandler(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.ctrlKey && e.key === "Enter") {
                  searchHandler();
                }
              }}
            />
            <button
              className="absolute right-[0.5rem] top-[50%] h-[2rem] translate-y-[-50%] rounded-md bg-primary px-3 text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
              onClick={() => {
                searchHandler();
              }}
            >
              검색
            </button>
          </label>
          <select
            value={status}
            onChange={(e) => {
              sortStatusHandler(e.target.value);
            }}
            className="ml-2 w-[6rem] rounded-md border p-1 shadow-sm"
          >
            <option value="ALL">모두</option>
            <option value="WAIT">답변대기</option>
            <option value="ANSWER"> 답변완료 </option>
            <option value="CLOSED"> 답변종료 </option>
          </select>
        </div>

        {/* 테이블 영역 */}
        <div className="my-2 w-full overflow-x-auto rounded-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]">
          <div className="min-w-[768px] bg-white">
            {/* 테이블 헤더 */}
            <div className="text-bold flex h-[3rem] items-center border-b-2 pb-2 font-bold text-gray-700">
              <div className="w-1/12 text-center">ID</div>
              <div className="w-5/12 text-center">제목</div>
              <div className="w-2/12 text-center">상태</div>
              <div className="w-3/12 text-center">날짜</div>
              <div className="w-1/12 text-center">User ID</div>
            </div>

            {/* 테이블 데이터 */}
            <div className="flex flex-col">
              {elements.map((item) => (
                <div
                  key={item.id}
                  className="flex border-b py-2 transition duration-150 ease-in-out hover:bg-gray-100"
                >
                  <div className="w-1/12 text-center">{item.id}</div>
                  <button
                    className="w-5/12 text-center hover:text-primary"
                    onClick={() => activeQnAHandler(item.id, item.userNickname)}
                  >
                    {item.title}
                  </button>
                  <div className="w-2/12 text-center">
                    <div
                      className={`flex w-full justify-center rounded-md py-1 text-xs font-semibold shadow-sm ${STATUS[item.status].style}`}
                    >
                      {STATUS[item.status].name}
                    </div>
                  </div>
                  <div className="w-3/12 text-center">
                    {format(new Date(item.createdAt), "yyyy-MM-dd")}
                  </div>
                  <button
                    onClick={() => {
                      alert(item.userId);
                    }}
                    className="w-1/12 text-center hover:text-primary"
                  >
                    {item.userNickname}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportQnAList;
