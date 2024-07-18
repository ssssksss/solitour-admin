
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserListContainer from "@/containers/users/UserListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "사용자 목록",
  description: "사용자 관리 어드민 페이지",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <UserListContainer />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
