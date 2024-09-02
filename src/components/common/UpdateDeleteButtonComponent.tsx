"use client"

// 모임이나 정보에서 수정, 삭제를 담고 있는 컴포넌트

import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

interface IUpdateDeleteButtonComponent {
    userId: number,
    updateHref: string,
    deleteHandler: () => void;

}
const UpdateDeleteButtonComponent = ({
  userId,
  updateHref,
  deleteHandler,
}: IUpdateDeleteButtonComponent) => {
  const authStore = useAuthStore();
  return (
    <>
      {authStore.isAdmin && authStore.id > 0 && (
        <div className="flex w-full justify-end gap-3 text-sm items-end">
          <Link
            className="flex flex-row items-center gap-1 hover:text-main dark:text-slate-400"
            href={updateHref}
          >
            <GoPencil />
            수정
          </Link>
          <button
            className="flex flex-row items-center gap-1 hover:text-main dark:text-slate-400"
            onClick={() => deleteHandler()}
          >
            <FaRegTrashCan />
            삭제
          </button>
        </div>
      )}
    </>
  );
};
export default UpdateDeleteButtonComponent