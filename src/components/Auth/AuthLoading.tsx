import LottieAirplane from "@/../public/lottie/loading-airplane.json";
import LottieComponent from "../common/lottie/LottieComponent";

const AuthLoading = () => {
  return (
    <div
      className={
        "fixed left-0 top-0 z-50 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-white"
      }
    >
      <div className={"relative h-[245px] w-[275px]"}>
        <LottieComponent
          lottieFile={LottieAirplane}
          className="h-full w-[275px]"
        />
      </div>
      <p> 로딩 중... </p>
    </div>
  );
};
export default AuthLoading;
