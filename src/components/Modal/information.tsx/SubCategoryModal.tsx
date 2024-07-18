import CreateSubCategory from "@/components/information/CreateSubCategory";
import DeleteSubCategory from "@/components/information/DeleteSubCategory";
import UpdateSubCategory from "@/components/information/UpdateSubCategory";
import { CategoryType } from "@/store/informationStore";
import { useState } from "react";

interface ISubCategoryModal {
  closeModal: () => void;
  activeMainCategory: CategoryType | null;
}

const SubCategoryModal = ({ closeModal, activeMainCategory }: ISubCategoryModal) => {
    const [activeTab, setActiveTab] = useState<"create" | "update" | "delete">(
    "create",
  );

  return (
    <div className="z-9 flex min-h-[22rem] flex-col bg-white p-4">
      <div className="mb-[1rem] flex flex-col">
        <div className="mb-4 flex items-center justify-between text-xl  font-bold">
          <div className=""> 서브 카테고리 </div>
          <button
            onClick={closeModal}
            className="btn flex items-center text-2xl"
          >
            x
          </button>
        </div>
        <div className="flex h-[3rem] w-full items-center gap-[1rem] py-[.5rem] ">
          <span className={"text-[1.2rem] font-bold"}> 메인 카테고리명 </span>
          <span className={"font-semibold text-primary"}>
            {activeMainCategory?.name}
          </span>
        </div>
      </div>

      <section className="flex flex-col gap-8 justify-between h-full ">
        <div className="tabs">
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

        {activeTab === "create" && (
          <CreateSubCategory activeMainCategory={activeMainCategory} />
        )}

        {activeTab === "update" && (
          <UpdateSubCategory activeMainCategory={activeMainCategory} />
        )}

        {activeTab === "delete" && (
          <DeleteSubCategory activeMainCategory={activeMainCategory} />
        )}
      </section>
    </div>
  );
};
export default SubCategoryModal
