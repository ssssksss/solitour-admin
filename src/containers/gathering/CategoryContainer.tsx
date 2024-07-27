"use client";

import Category from "@/components/gathering/Category";
import useGatheringStore, { CategoryType } from "@/store/gatheringStore";
import { useLayoutEffect, useState } from "react";

interface ICategoryContainer {
  categories: CategoryType[];
}

const CategoryContainer = ({ categories }: ICategoryContainer) => {
  const gatheringStore = useGatheringStore();
  const [activeMainCategory, setActiveMainCategory] =
    useState<CategoryType | null>(
      categories?.length > 0 ? categories[0] : null,
    );
  const [isOpenMainModal, setIsOpenMainModal] = useState(false);
  const [isOpenSubModal, setIsOpenSubModal] = useState(false);

  const setActiveMainCategoryHandler = (mainCategory: CategoryType) => {
    setActiveMainCategory(mainCategory);
  };

  const setIsOpenMainModalHandler = (props: boolean) => {
    setIsOpenMainModal(props);
  };

  const setIsOpenSubModalHandler = (props: boolean) => {
    setIsOpenSubModal(props);
  };

  useLayoutEffect(() => {
    if (categories?.length > 0) {
      gatheringStore.setCategories(categories);
    }
  }, []);

  return (
    <>
      <Category
        categories={gatheringStore.categories}
        activeMainCategory={activeMainCategory}
        setActiveMainCategoryHandler={setActiveMainCategoryHandler}
        modalProps={{
          isMainModal: isOpenMainModal,
          setIsOpenMainModalHandler: setIsOpenMainModalHandler,
          isSubModal: isOpenSubModal,
          setIsOpenSubModalHandler: setIsOpenSubModalHandler,
        }}
      />
    </>
  );
};
export default CategoryContainer;
