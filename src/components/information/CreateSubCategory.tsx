import useInformationStore, { CategoryType } from "@/store/informationStore";
import useToastifyStore from "@/store/toastifyStore";
import { useState } from "react";

interface ICreateSubCategory {
  activeMainCategory: CategoryType | null;
}

const CreateSubCategory = ({ activeMainCategory}: ICreateSubCategory) => {
  const [text, setText] = useState("");
  const informationStore = useInformationStore();
  const toasityStore = useToastifyStore();
  const submitHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      {
        method: "POST",
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
      let temp = informationStore.categories.map(i => {
        if (i.id == activeMainCategory?.id) {
          i.childrenCategories.push(data);
        }
        return i;
      })
      informationStore.setCategories(temp);
      toasityStore.setToastify({
        type: "success",
        message: "생성되었습니다.",
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
    <div className="flex flex-col justify-between gap-[1rem]">
      <input
        type="text"
        placeholder="새 카테고리 이름"
        className="input input-bordered w-full"
        maxLength={20}
        minLength={2}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <button
        className={`btn btn-primary disabled:bg-red-100`}
        disabled={text.length < 2 || text.length > 20}
        onClick={submitHandler}
      >
        카테고리 생성
      </button>
    </div>
  );
};
export default CreateSubCategory;