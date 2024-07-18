import useInformationStore from "@/store/informationStore";
import useToastifyStore from "@/store/toastifyStore";
import { useState } from "react";

const CreateMainCategory = () => {
  const [text, setText] = useState("");
  const informationStore = useInformationStore();
  const toasityStore = useToastifyStore();
  const submitHandler = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: text
      }),
    })
    if (response.status == 201) {
      const data = await response.json();
      informationStore.setCategories([...informationStore.categories, data]);
      toasityStore.setToastify({
        type: "success",
        message: "생성되었습니다.",
      });
      setText("");
    } else {
      toasityStore.setToastify({
        type: "error",
        message: "요청에 실패했습니다."
      })
    }
  }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault();
        if (!(text.length < 2 || text.length > 20)) submitHandler();
      }
    };

  return (
    <div className="flex justify-between gap-[1rem]">
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
export default CreateMainCategory;