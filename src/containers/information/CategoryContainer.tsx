"use client"

import Category from "@/components/information/Category";
import useInformationStore, { CategoryType } from "@/store/informationStore";
import { useLayoutEffect, useState } from "react";



const CategoryContainer = () => {
  const informationStore = useInformationStore();
  const [activeMainCategory, setActiveMainCategory] = useState<CategoryType | null>(null);
  const [isOpenMainModal, setIsOpenMainModal] = useState(false);
  const [isOpenSubModal, setIsOpenSubModal] = useState(false);

  const setActiveMainCategoryHandler = (mainCategory: CategoryType) => {
    setActiveMainCategory(mainCategory);
  }

  const setIsOpenMainModalHandler = (props: boolean) => {
    setIsOpenMainModal(props);
  };
  
  const setIsOpenSubModalHandler = (props: boolean) => {
    setIsOpenSubModal(props);
  };


  useLayoutEffect(() => {
    const test = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (data.length > 0) {
        informationStore.setCategories(data);
        setActiveMainCategory(data[0]);
      }
    }
    try {
      test();
    }
    catch {

    }
  },[])

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