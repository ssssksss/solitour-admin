import { usersResponseDto } from "@/types/UserDto";
import { handleKeyDown } from "@/utils/handleKeyDown";
import Image from "next/image";
import { useRef } from "react";

interface IUserTable {
  userList: usersResponseDto[];
  changePageHandle: (_: number) => void;
  searchNicknameHandle: (_: string) => void;
  count: number;
}

const SPACE = [
  "w-[4rem]", // ID
  "w-[6rem]", // 이름
  "w-[12rem]", // 이메일
  "w-[6rem]", // 닉네임
  "w-[8rem]", // 휴대폰
  "w-[4rem]", // 나이
  "w-[10rem]", // 가입 플랫폼
  "w-[6rem]", // 성별
  "w-[8rem]", // 상태
  "w-[8rem]", // 관리자 유무
  "w-[10rem]", // 활성화 유무
  "w-[12rem]", // 생성 날짜
  "w-[12rem]", // 삭제 날짜
  "w-[12rem]", // 최근 로그인
];

const UserTable = ({
  userList,
  changePageHandle,
  count,
  searchNicknameHandle,
}: IUserTable) => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      <div className="my-[1rem] flex h-[3rem] gap-[1rem]">
        <input
          type={"text"}
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
          className={"btn"}
          onClick={() => searchNicknameHandle(searchRef.current?.value || "")}
        >
          찾기
        </button>
      </div>
      <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col overflow-x-auto bg-dark-8 shadow-lg dark:bg-dark-6 ">
        <div className="w-full text-[1rem] shadow-md">
          <div className="flex-cols flex w-full">
            <div className="grid grid-flow-col flex-wrap bg-primary dark:bg-primary-dark ">
              {[
                "ID",
                "이름",
                "이메일",
                "닉네임",
                "휴대폰",
                "나이",
                "가입 플랫폼",
                "성별",
                "상태",
                "관리자 유무",
                "활성화 유무",
                "생성 날짜",
                "삭제 날짜",
                "최근 로그인",
              ].map((header, index) => (
                <div
                  key={index}
                  className={`${SPACE[index]} border-b border-gray-200 p-3 font-bold uppercase text-primary-content dark:text-dark-content-6`}
                >
                  {header}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-cols flex min-w-max bg-primary-4 font-semibold dark:bg-gray-6 dark:text-dark-content-5">
            {userList?.map((user, userIndex) => (
              <div key={userIndex} className="grid grid-flow-col flex-wrap ">
                <div className={`${SPACE[0]} border-b  p-3 `}>{user.id}</div>
                <div className={`${SPACE[1]} border-b  p-3 `}>{user.name}</div>
                <div className={`${SPACE[2]} border-b  p-3 `}>{user.email}</div>
                <div className={`${SPACE[3]} border-b  p-3 `}>{user.name}</div>
                <div className={`${SPACE[4]} border-b  p-3 `}>
                  {user.phoneNumber}
                </div>
                <div className={`${SPACE[5]} border-b  p-3 `}>{user.age}</div>
                <div className={`${SPACE[6]} border-b p-3`}>
                  {user.provider == "kakao" ? (
                    <div className="relative aspect-square w-[2rem] bg-[#FEE500] ">
                      <Image
                        src={"/images/logo/kakao-icon.svg"}
                        alt={"kakao-logo-image"}
                        fill={true}
                        className="translate-x-[.125rem]"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-square w-[2rem] bg-[#fff]">
                      <Image
                        src={"/images/logo/google-icon.svg"}
                        alt={"google-logo-image"}
                        fill={true}
                      />
                    </div>
                  )}
                </div>
                <div className={`${SPACE[7]} border-b  p-3 `}>
                  {user.sex == "male"
                    ? "남성"
                    : user.sex == "female"
                      ? "여성"
                      : "?"}
                </div>
                <div className={`${SPACE[8]} border-b  p-3 `}>
                  {user.userStatus}
                </div>
                <div className={`${SPACE[9]} border-b  p-3 `}>
                  {user.isAdmin ? "관리자" : "사용자"}
                </div>
                <div className={`${SPACE[10]} border-b  p-3 `}>
                  {user.isActive ? "활동" : "정지"}
                </div>
                <div className={`${SPACE[11]} border-b  p-3 `}>
                  {user.createdAt?.substring(0, 10)}
                </div>
                <div className={`${SPACE[12]} border-b  p-3 `}>
                  {user.deletedAt?.substring(0, 10) ?? ""}
                </div>
                <div className={`${SPACE[13]} border-b  p-3 `}>
                  {user.latestLoginAt}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="absolute bottom-8 w-[calc(100%-3rem)] bg-dark-8 shadow-lg dark:bg-dark-6 dark:text-white">
          <Pagination
            // endPage={Number(count / 10 + 1)}
            // refetch={changePageHandle}
            currentPage={}
            totalPages={Number(count / 10 + 1)}
            pageHandler={() => {}}
          />
        </div> */}
      </div>
    </div>
  );
};
export default UserTable;
