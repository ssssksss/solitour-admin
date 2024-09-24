"use client"

import Pagination from "@/components/Pagination/Pagination";
import SupportNoticeList from "@/components/support/SupportNoticeList";
import { NoticeType } from "@/types/NoticeDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


interface ISupportNoticeContainer {
}
const SupportNoticeContainer = (props: ISupportNoticeContainer) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const [elements, setElements] = useState<NoticeType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageHandler = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page + "");
    url.search = params.toString();
    setCurrentPage(page);
    fetchNotice(page);
    window.history.pushState({}, "", url.toString());
  };

  const fetchNotice = async (page: number) => {
    const response = await fetchWithAuth(`/api/notice?page=${page}`);
    const data = await response.json();
    setElements(data.content);
    setTotalPages(data.page.totalPages);
  }

  useEffect(()=>{
    fetchNotice(currentPage);
  },[])

  return (
    <>
      <SupportNoticeList
        data={elements}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageHandler={pageHandler}
      />
    </>
  );
};
export default SupportNoticeContainer