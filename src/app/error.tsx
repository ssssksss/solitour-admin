"use client"; // Error components must be Client Components

import BackButtonContainer from "@/containers/common/BackButtonContainer";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "error",
  description: "Solitour의 error 페이지",
};

const Error = () => {
  return (
    <main className="flex items-center justify-center px-6 py-20">
      <div className="justify-centermax-[1024px]:w-[39.75rem] flex w-[60rem] flex-col items-start max-[744px]:w-[calc(100%_-_48px)]">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-[2.25rem] font-bold text-black max-[744px]:text-2xl dark:text-slate-200">
            앗..오류가 발생하였습니다.
          </h1>
          <div className="flex flex-col items-start text-gray1 dark:text-slate-400">
            <p>시스템에 오류가 발생하였습니다.</p>
            <p>잠시 후에 다시 시도해 주세요.</p>
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
        </div>
        <div className="flex w-full flex-row justify-end">
          <div className="relative h-[14.375rem] w-[18.375rem] max-[1024px]:w-[16rem] max-[744px]:w-[14rem]">
            <Image
              src="/error_sign.svg"
              alt="error_sign"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error;
