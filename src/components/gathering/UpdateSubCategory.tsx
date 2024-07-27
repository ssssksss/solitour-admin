import useGatheringStore, { CategoryType } from "@/store/gatheringStore";
import useToastifyStore from "@/store/toastifyStore";
import { useState } from "react";
interface IUpdateSubCategory {
  activeMainCategory: CategoryType | null;
}

const UpdateSubCategory = ({ activeMainCategory}: IUpdateSubCategory) => {
  const [text, setText] = useState("");
  const [choiceCategoryId, setChoiceCategoryId] = useState<number>();
  const gatheringStore = useGatheringStore();
  const toasityStore = useToastifyStore();
  const submitHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/gathering/${choiceCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentCategory: activeMainCategory?.id,
          name: text,
        }),
      },
    );
    if (response.status == 201) {
      const data = await response.json();
      let temp = gatheringStore.categories.map((i) => {
        if (i.id == activeMainCategory?.id) {
          i.childrenCategories.map(j => {
            if (j.id == data.id) {
              j.name = data.name;
            }
            return j;
          })
        }
        return i;
      });
      gatheringStore.setCategories(temp);
      toasityStore.setToastify({
        type: "success",
        message: "수정되었습니다.",
      });
      setText("");
    } else {
      toasityStore.setToastify({
        type: "error",
        message: "요청에 실패했습니다.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      if (!(text.length < 2 || text.length > 20)) submitHandler();
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
        >
          <option value="" selected disabled>
            선택하세요
          </option>
          {activeMainCategory?.childrenCategories.map((i) => (
            <option value={i.id} key={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-between gap-[1rem]">
        <input
          type="text"
          placeholder="카테고리 수정할 이름"
          className="input input-bordered w-full"
          maxLength={20}
          minLength={2}
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`btn bg-primary text-primary-content disabled:bg-gray`}
          disabled={text.length < 2 || text.length > 20}
          onClick={submitHandler}
        >
          카테고리 수정
        </button>
      </div>
    </div>
  );
};
export default UpdateSubCategory;