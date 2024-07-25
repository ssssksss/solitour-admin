"use client"

import InformationTable from "@/components/information/InformationTable";
import { InformationDto } from "@/types/InformationDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";


const InformationContainer = () => {

    const [informationList, setInformationList] = useState<InformationDto[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const getInformationList = async () => {
        const response = await fetchWithAuth(
          `/api/information?page=${page}&nickname=${nickname}`,
        );
        if (response.status == 200) {
            const data = await response.json();
            if (data.status != 500) {
              setInformationList(data.informations);
              setCount(data.count);
              setNickname(nickname);
            }
        }
        };
        getInformationList();
    }, [page, nickname]);

    const changePageHandle = (props: number) => {
    setPage(+props <= 1 ? 1 : props);
    };

    const searchNicknameHandle = (props: string) => {
    setNickname(props);
    setPage(1);
    };

  return (
    <div className={"flex w-full flex-col "}>
      <InformationTable
        informationList={informationList}
        searchNicknameHandle={searchNicknameHandle}
        changePageHandle={changePageHandle}
        count={count}
        nickname={nickname}
      />
    </div>
  );
};
export default InformationContainer