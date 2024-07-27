import CreateMainCategory from "@/components/information/CreateMainCategory";
import DeleteMainCategory from "@/components/information/DeleteMainCategory";
import UpdateMainCategory from "@/components/information/UpdateMainCategory";
import { useState } from "react";

interface IMainCategoryModal {
  closeModal: () => void;
}

const MainCategoryModal = ({ closeModal }: IMainCategoryModal) => {
  const [activeTab, setActiveTab] = useState<"create" | "update" | "delete">(
    "create",
  );

  return (
    <div className="z-9 min-h-[18rem] bg-white p-4 gap-4 flex flex-col">
      <div className="flex items-center justify-between text-xl  font-bold">
        <div className=""> 메인 카테고리 </div>
        <button onClick={closeModal} className="btn flex items-center text-2xl">
          x
        </button>
      </div>

      <div className="tabs mb-4">
        <button
          className={`tab-bordered tab ${activeTab === "create" ? "rounded-lg bg-secondary text-white" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          카테고리 생성
        </button>
        <button
          className={`tab-bordered tab ${activeTab === "update" ? "rounded-lg bg-secondary text-white" : ""}`}
          onClick={() => setActiveTab("update")}
        >
          카테고리 수정
        </button>
        <button
          className={`tab-bordered tab ${activeTab === "delete" ? "rounded-lg bg-secondary text-white" : ""}`}
          onClick={() => setActiveTab("delete")}
        >
          카테고리 삭제
        </button>
      </div>

      {activeTab === "create" && <CreateMainCategory />}

      {activeTab === "update" && <UpdateMainCategory />}

      {activeTab === "delete" && <DeleteMainCategory />}
    </div>
  );
};

export default MainCategoryModal;
