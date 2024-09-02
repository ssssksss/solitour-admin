import SearchForm from "@/components/Header/SearchForm";
import useAuthStore from "@/store/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect } from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const authStore = useAuthStore();

    useLayoutEffect(() => {
      // 자동 로그인
   const login = async () => {
      try {
        const res = await fetchWithAuth("/api/auth/user");
        if (res.status == 200) {
          const data = await res.json();
            authStore.setUser(data);
        } else {
          authStore.setUser({
            id: -1,
          });
        }
      } catch {
        authStore.setUser({
          id: -1,
        });
      }
    };
    login();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 min-[1400px]:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 min-[1400px]:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          <Link
            className="relative block h-[3rem] w-[6rem] flex-shrink-0 min-[1400px]:hidden"
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
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2 2xsm:gap-4 lg:w-full">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            <SearchForm />
            {/* <!-- Search Form --> */}

            {/* <!-- Dark Mode Toggle --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggle --> */}
          </ul>

          {
            <div className="flex flex-row items-center gap-2 pr-[2.375rem] text-sm max-[1024px]:pr-4 ">
              {authStore.nickname == "" ? (
                <Link
                  className="text-gray1 hover:text-main font-medium dark:text-slate-400"
                  href="/auth/signin"
                >
                  로그인
                </Link>
              ) : (
                <>
                  <DropdownUser
                    userProps={{
                      nickname: authStore.nickname,
                      email: authStore.email,
                      userImage: authStore.userImage,
                    }}
                  />
                </>
              )}
            </div>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
