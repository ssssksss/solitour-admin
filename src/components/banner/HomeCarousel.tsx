
interface Props {
  images: {id: null | number, url: string}[];
  currentIndex: number;
  onClick: (index: number) => void;
}

const HomeCarousel = ({ images, currentIndex, onClick }: Props) => {
  return (
    <div className="relative mt-2 flex h-[37.5rem] w-full items-center justify-center dark:opacity-65 max-[1024px]:h-80">
      <img
        className="-z-10"
        src={images.length > 0 ? images[currentIndex].url : ""}
        alt={"/background"}
        style={{
          objectFit: "cover",
          width: "100%", // Ensure the image fills its container
          height: "100%", // Ensure the image fills its container
          position: "absolute", // This should be adjusted based on your layout
          top: 0,
          left: 0,
          zIndex: -10, // To match the "-z-10" class
        }}
      />
      <div className="relative m-auto flex h-[33.75rem] w-[60rem] flex-col items-center justify-end max-[1024px]:h-72 max-[1024px]:w-[90%]">
        <div className="absolute bottom-52 left-0 flex flex-col gap-4 max-[1024px]:bottom-16">
          <div className="text-[1.75rem] text-white max-[1024px]:text-xl">
            <h1>새로운 나를 찾는 여행,</h1>
            <h1 className="font-bold">솔리투어</h1>
          </div>
          <button className="flex h-[2.6875rem] w-[7.5rem] items-center justify-center rounded-3xl bg-black font-medium text-white hover:scale-105">
            둘러보기
          </button>
        </div>
        <div className="flex w-[60rem] flex-row items-center justify-center max-[1024px]:w-[90%]">
          {images.map((image, index) => (
            <button
              key={index}
              className={
                "flex-grow border-b-4" +
                ` ${index === currentIndex ? "border-b-white" : "border-b-white/50"}`
              }
              onClick={(e) => onClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
