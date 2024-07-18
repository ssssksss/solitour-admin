import ClickOutside from "@/components/ClickOutside";
import useAuthStore from "@/store/authStore";
import { faAngleUp, faArrowRightFromBracket, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IDropdownUser {
  userProps: {
    email?: string;
    nickname?: string;
    userImage?: {
      id: number,
      createdDate: string,
      address: string,
    }
  };
}

const DropdownUser = ({ userProps }: IDropdownUser) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const authStore = useAuthStore();

    const logoutHandler = async () => {
      // api로 로그아웃 요청해서 쿠키제거
      authStore.initialize();
      await fetch("/api/auth/logout");
    };


  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={
              userProps.userImage?.address == "male"
                ? "/images/user/user_sex_man_default_image.svg"
                : userProps.userImage?.address == "female"
                  ? "/images/user/user_sex_woman_default_image.svg"
                  : (userProps.userImage?.address as string)
            }
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{userProps.nickname}</span>
          <FontAwesomeIcon icon={faAngleUp} rotation={dropdownOpen ? undefined : 180} />
        </span>
      </Link>

      {/* <!-- Dropdown Star --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}
        >
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src={
                  userProps.userImage?.address == "male"
                    ? "/images/user/user_sex_man_default_image.svg"
                    : userProps.userImage?.address == "female"
                      ? "/images/user/user_sex_woman_default_image.svg"
                      : (userProps.userImage?.address as string)
                }
                style={{
                  width: "auto",
                  height: "auto",
                }}
                alt="User"
                className="overflow-hidden rounded-full"
              />

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                {userProps.nickname}
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                {userProps.email}
              </span>
            </span>
          </div>
          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/profile"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <div className="aspect-square w-[1.125rem]">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                View profile❌
              </Link>
            </li>

            <li>
              <Link
                href="/pages/settings"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <div className="aspect-square w-[1.125rem]">
                  <FontAwesomeIcon icon={faGear} />
                </div>
                Account Settings❌
              </Link>
            </li>
          </ul>
          <div className="p-2.5">
            <button
              onClick={logoutHandler}
              className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
            >
              <div className="aspect-square w-[1.125rem]">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  rotation={180}
                />
              </div>
              Logout
            </button>
          </div>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
