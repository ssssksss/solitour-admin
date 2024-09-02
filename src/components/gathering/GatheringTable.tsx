import { GatheringDto } from "@/types/GatheringDto";
import { handleKeyDown } from "@/utils/handleKeyDown";
import { useRef } from "react";

interface IGatheringTable {
  gatheringList: GatheringDto[];
  changePageHandle: (_: number) => void;
  searchNicknameHandle: (_: string) => void;
  count: number;
  nickname: string;
}

const SPACE = [
  "w-[4rem]", // ID
  "w-[6rem]", // 이름
  "w-[8rem]", // 닉네임
  "w-[12rem]", // 주소
  "w-[10rem]", // 생성일
  "w-[12rem]", // 정보 제목
  "w-[8rem]", // 정보 조회수
  "w-[10rem]", // 메인 카테고리
  "w-[10rem]", // 서브 카테고리
];

const GatheringTable = ({
  gatheringList,
  changePageHandle,
  count,
  searchNicknameHandle,
  nickname,
}: IGatheringTable) => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      <div className="flex h-[3rem] gap-[1rem]">
        <input
          type="text"
          ref={searchRef}
          className="h-full w-full rounded-lg px-[.5rem]"
          placeholder="닉네임 찾기"
          onKeyDown={(e) =>
            handleKeyDown(e)(
              searchNicknameHandle,
              searchRef.current?.value as string,
            )
          }
        />
        <button
          className="btn"
          onClick={() => searchNicknameHandle(searchRef.current?.value || "")}
        >
          찾기
        </button>
      </div>
      <div
        className={
          "my-[1rem] flex h-[3rem] items-center gap-4 rounded-[1rem] bg-white px-[.5rem] py-2 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3] dark:bg-dark-6 dark:text-white"
        }
      >
        <span> 검색결과 </span>
        <span className="font-bold text-red-400"> {nickname} </span>
      </div>
      <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col overflow-x-auto bg-dark-8 shadow-lg dark:bg-dark-6">
        <div className="w-full text-[1rem] shadow-md">
          <div className="flex-cols flex w-full  ">
            <div className="grid grid-flow-col flex-wrap bg-primary dark:bg-primary-dark">
              {[
                "ID",
                "이름",
                "닉네임",
                "주소",
                "생성일",
                "정보 제목",
                "정보 조회수",
                "메인 카테고리",
                "서브 카테고리",
              ].map((header, index) => (
                <div
                  key={index}
                  className={`${SPACE[index]}  border-gray-200 p-3 font-bold uppercase text-primary-content dark:text-dark-content-6`}
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-cols flex min-w-max bg-primary-4 font-semibold dark:bg-gray-6 dark:text-dark-content-5">
            {gatheringList?.map((info, infoIndex) => (
              <div key={infoIndex} className="grid grid-flow-col flex-wrap">
                <div className={`${SPACE[0]} border-b p-3`}>{info.id}</div>
                <div className={`${SPACE[1]} border-b p-3`}>
                  {info.userName}
                </div>
                <div className={`${SPACE[2]} border-b p-3`}>
                  {info.userNickname}
                </div>
                <div className={`${SPACE[3]} border-b p-3`}>{info.address}</div>
                <div className={`${SPACE[4]} border-b p-3`}>
                  {info.createdDate.substring(0, 10)}
                </div>
                <div className={`${SPACE[5]} border-b p-3`}>
                  {info.categoryName}
                </div>
                <div className={`${SPACE[6]} border-b p-3`}>
                  {info.viewCount}
                </div>
                <div className={`${SPACE[7]} border-b p-3`}>
                  {info.categoryParentCategoryName}
                </div>
                <div className={`${SPACE[8]} border-b p-3`}>
                  {info.zoneCategoryName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 mb-[1rem] w-[calc(100%)] bg-dark-8 shadow-lg dark:bg-dark-6 dark:text-white">
        {/* <Pagination
          endPage={Math.ceil(count / 10)}
          refetch={changePageHandle}
        /> */}
      </div>
    </div>
  );
};

export default GatheringTable;
