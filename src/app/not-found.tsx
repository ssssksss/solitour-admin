import BackButtonContainer from "@/containers/common/BackButtonContainer";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Solitour의 Not found 페이지",
};

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-6 px-6 py-20">
      <div className="relative h-[14.375rem] w-[23.4375rem] max-[744px]:w-80">
        <Image
          src="/404.svg"
          alt="404"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="flex flex-row items-center gap-3 text-black max-[744px]:flex-col max-[744px]:gap-0 dark:text-slate-200">
        <h1 className="text-[2.25rem] font-bold">앗..요청하신 페이지를</h1>
        <h1 className="text-[2.25rem] font-bold">찾을 수 없습니다.</h1>
      </div>
      <div className="flex flex-col items-center text-gray1 dark:text-slate-400">
        <p>존재하지 않는 주소를 입력하셨거나,</p>
        <div className="flex flex-row items-center gap-1 max-[480px]:flex-col max-[480px]:gap-0">
          <p>요청하신 페이지의 주소가 변경,</p>
          <p>삭제되어 찾을 수 없습니다.</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[0.625rem]">
        <Link
          className="flex h-[2.625rem] w-[6.625rem] flex-row items-center justify-center rounded-full border-[0.0625rem] border-gray3 hover:scale-105 dark:border-slate-400 dark:bg-slate-600 dark:text-slate-400"
          href="/"
        >
          홈으로
        </Link>
        <BackButtonContainer />
      </div>
    </main>
  );
};

export default NotFound;
