import { ConfirmButton } from "@/components/Buttons/ConfirmButton";
import useGatheringStore, { CategoryType } from "@/store/gatheringStore";
import useToastifyStore from "@/store/toastifyStore";
import { useState } from "react";
interface IDeleteSubCategory {
  activeMainCategory: CategoryType | null;
}

const DeleteSubCategory = ({ activeMainCategory}: IDeleteSubCategory) => {
  const [choiceCategoryId, setChoiceCategoryId] = useState<number>();
  const gatheringStore = useGatheringStore();
  const toasityStore = useToastifyStore();
  const submitHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/gathering/${choiceCategoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status == 201) {
      const data = await response.json();
      let temp = gatheringStore.categories.filter((i) => i.id != data.id);
      gatheringStore.setCategories(temp);
      toasityStore.setToastify({
        type: "success",
        message: "삭제되었습니다.",
      });
    } else {
      toasityStore.setToastify({
        type: "error",
        message: "요청에 실패했습니다.",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <label htmlFor={"custom-select"} className="relative">
        <select
          id={"custom-select"}
          className={
            "h-[2.5rem] w-full rounded-[1rem] pl-2 outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
          }
          style={{ overflowY: "auto" }}
          onChange={(e) => {
            setChoiceCategoryId(+e.target.value);
          }}
          disabled
        >
          <option value="" selected disabled>
            삭제는 현재 API가 존재하지 않습니다.
          </option>
          {gatheringStore.categories.map((i) => (
            <option value={i.id} key={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </label>
      <ConfirmButton
        className={`btn bg-primary text-primary-content disabled:bg-gray`}
        onClick={submitHandler}
        // disabled={!choiceCategoryId}
        disabled={true}
      >
        카테고리 삭제
      </ConfirmButton>
    </div>
  );
};
export default DeleteSubCategory;
