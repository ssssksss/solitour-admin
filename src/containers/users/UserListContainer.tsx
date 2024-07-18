"use client";

import UserTable from "@/components/Users/UserTable";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";

const UserListContainer = () => {

    const [userList, setUserList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const getUserList = async () => {
            const response = await fetchWithAuth(`/api/auth/users?page=${page}&nickname=${nickname}`);
            if (response.status == 200) {
                const data = await response.json();
                if (data.status != 500) {
                    setUserList(data.users);
                    setCount(data.count);
                }
            }
        }
        getUserList();
    }, [page, nickname])

    const changePageHandle = (props: number) => {
        setPage(+props <= 1 ? 1 : props );
    }

    const searchNicknameHandle = (props: string) => {
        setNickname(props);
        setPage(1);
    }

    return (
      <>
        <UserTable
          userList={userList}
          searchNicknameHandle={searchNicknameHandle}
          changePageHandle={changePageHandle}
          count={count}
        />
      </>
    );
};
export default UserListContainer;
