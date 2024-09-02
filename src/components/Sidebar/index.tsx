"use client";

import ClickOutside from "@/components/ClickOutside";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  faBookAtlas,
  faChartPie,
  faComments,
  faFilePen,
  faGear,
  faHeadset,
  faHouse,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "어플리케이션 관리",
    menuItems: [
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faHouse} />
          </div>
        ),
        label: "대시보드",
        route: "#",
        children: [{ label: "홈 ❌", route: "/" }],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faBookAtlas} />
          </div>
        ),
        label: "정보 서비스",
        route: "#",
        children: [
          { label: "정보 대시보드 ❌", route: "/information/dashboard" },
          { label: "정보 카테고리", route: "/information/category" },
          { label: "정보 관리❌", route: "/information/management" },
        ],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faComments} />
          </div>
        ),
        label: "모임 서비스",
        route: "#",
        children: [
          { label: "모임 카테고리", route: "/gathering/category" },
          { label: "모임 관리❌", route: "/gathering/management" },
        ],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faFilePen} />
          </div>
        ),
        label: "일기 서비스❌",
        route: "#",
        children: [{ label: "일기 관리❌", route: "/diary/management" }],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faGear} />
          </div>
        ),
        label: "전체 서비스",
        route: "#",
        children: [
          { label: "홈 배너 관리", route: "/service/banner" },
          { label: "공지사항", route: "/service/notice" },
          { label: "QnA 관리", route: "/service/qna" },
          { label: "문의하기", route: "/service/contact" },
        ],
      },
    ],
  },
  {
    name: "기타 관리",
    menuItems: [
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faUserGear} />
          </div>
        ),
        label: "사용자 관리",
        route: "#",
        children: [{ label: "사용자 목록", route: "/user/list" }],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faChartPie} />
          </div>
        ),
        label: "분석 및 통계❌",
        route: "#",
        children: [
          { label: "방문자 수❌", route: "/analysis/visitors" },
          { label: "정보 통계❌", route: "/analysis/information" },
          { label: "모임 통계❌", route: "/analysis/gather" },
          { label: "일기 통계❌ ", route: "/analysis/diary" },
        ],
      },
      {
        icon: (
          <div className="flex aspect-square w-[1.5rem] items-center justify-center">
            <FontAwesomeIcon icon={faHeadset} />
          </div>
        ),
        label: "문의 및 상담❌",
        route: "#",
        children: [{ label: "사용자 문의❌", route: "/user/contact" }],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark min-[1400px]:static min-[1400px]:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-[1rem] py-5.5 lg:py-6.5 xl:py-10">
          <Link
            className="relative h-8 w-[5rem] font-black min-[1024px]:ml-[.5rem]"
            href="/"
          >
            <Image
              className="dark:hidden"
              src={"/images/logo/Solitour-logo.svg"}
              alt={"/background"}
              fill={true}
              style={{
                objectFit: "contain",
              }}
            />
            <Image
              className="hidden dark:block"
              src={"/images/logo/solitour-logo-dark-mode.png"}
              alt={"/background"}
              fill={true}
              style={{
                objectFit: "contain",
              }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block min-[1400px]:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
