import introLottie from "@lottie/solitour-intro-image.json";
import Image from "next/image";
import Link from "next/link";
import LottieComponent from "../common/Loader/lottie/LottieComponent";

const SignIn = () => {
  return (
    <div className={"flex max-w-[17.1875rem] flex-col pb-[8.125rem]"}>
      <h1 className={"pb-[1rem] text-4xl font-bold"}> 로그인 </h1>
      <p className={"text-md text-gray1 w-[19.875rem] font-medium"}>
        SNS로 솔리투어에 로그인하고 더 많은 서비스를 즐겨보세요!
      </p>
      <div className={"relative h-[245px] w-[275px]"}>
        <LottieComponent
          lottieFile={introLottie}
          className="h-full w-[275px]"
        />
        <div className="absolute left-[4.625rem] top-[6.0625rem] h-[6.75rem] w-[11rem]">
          <div className={"relative h-full w-full"}>
            <Image
              src={"/images/intro/solitour-intro-image.png"}
              alt={"solitour-intro-image"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <Link
        className={
          "relative mb-[0.75rem] flex h-[2.875rem] w-full items-center justify-center rounded-3xl bg-[#FEE500]"
        }
        href="/api/auth/kakao"
      >
        <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
          <Image
            src={"/images/logo/kakao-icon.svg"}
            alt={"kakao-logo-image"}
            fill={true}
          />
        </div>
        <span className="text-sm font-semibold text-black">
          카카오로 로그인
        </span>
      </Link>
      <Link
        className={
          "outline-gray3 relative mb-[3rem] flex h-[2.875rem] w-full items-center justify-center rounded-3xl outline outline-[1px] outline-offset-[-1px]"
        }
        href="/api/auth/google"
      >
        <div className="absolute left-[1rem] top-[50%] aspect-square w-[1rem] translate-y-[-50%]">
          <Image
            src={"/images/logo/google-icon.svg"}
            alt={"google-logo-image"}
            fill={true}
          />
        </div>
        <span className="text-sm font-semibold text-black">구글로 로그인</span>
      </Link>
    </div>
  );
};
export default SignIn;
