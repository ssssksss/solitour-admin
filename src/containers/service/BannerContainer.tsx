"use client"

import BannerImageList from "@/components/banner/BannerImageList";
import HomeCarousel from "@/components/banner/HomeCarousel";
import { Banner } from "@/types/BannerDto";
import { useEffect, useState } from "react";

interface IBannerContainer {
  initBannerList: Banner[] | [];
}
const BannerContainer = (props: IBannerContainer) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bannerList, setBannerList] = useState([
    { id: 0, name: "",url: "/images/banner/background1.png" },
    { id: 0, name: "",url: "/images/banner/background2.svg" },
    { id: 0, name: "",url: "/images/banner/background3.svg" },
    { id: 0, name: "", url: "/images/banner/background4.svg" },
    ...props.initBannerList
  ]);

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  const addBannerHandler = ({ id, url }: { id: number; url: string }) => {
    setBannerList((prev) => [...prev, { id, name: "",url }]);
    setCurrentIndex((currentIndex + 1) % bannerList.length);
  };

  const deleteBannerHandler = (id: number) => {
    setBannerList((prev) => prev.filter((banner) => banner.id !== id));
    setCurrentIndex((prevIndex) =>
      prevIndex >= bannerList.length - 1 ? prevIndex - 1 : prevIndex,
    );
  };

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((currentIndex + 1) % (bannerList.length || 1)),
      3000,
    );

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, bannerList.length]);

  return (
    <>
      <HomeCarousel
        images={bannerList}
        currentIndex={currentIndex}
        onClick={onClick}
      />
      <BannerImageList
        bannerList={bannerList}
        addBannerHandler={addBannerHandler}
        deleteBannerHandler={deleteBannerHandler}
      />
    </>
  );
};
export default BannerContainer;
