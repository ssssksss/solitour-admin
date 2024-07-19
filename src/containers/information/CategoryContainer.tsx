"use client"

import Category from "@/components/information/Category";
import useInformationStore, { CategoryType } from "@/store/informationStore";
import { useLayoutEffect, useState } from "react";


interface ICategoryContainer {
  categories: CategoryType[];
}


const CategoryContainer = ({ categories }: ICategoryContainer) => {
  const informationStore = useInformationStore();
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
    if (categories.length > 0) {
      informationStore.setCategories(categories);
    }
  }, [])
  
  // if (categories.length == undefined) {
  //   throw new Error("Internal Server Error");
  // }

  return (
    <>
      <Category
        categories={informationStore.categories}
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