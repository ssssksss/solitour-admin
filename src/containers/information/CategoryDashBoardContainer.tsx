"use client"

import Dashboard from "@/components/information/Dashboard";
import useInformationStore from "@/store/informationStore";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const CategoryDashBoardContainer = () => {
  const informationStore = useInformationStore();
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(35.6, 127.9), // 지도의 중심좌표
          level: 12, // 지도의 확대 레벨
        };
        const _kakao = new window.kakao.maps.Map(mapContainer, mapOption);
        _kakao.setDraggable(false);
        _kakao.setZoomable(false);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};
export default CategoryDashBoardContainer;