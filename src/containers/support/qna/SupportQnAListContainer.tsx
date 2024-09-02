"use client"

import { Modal } from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import QnAResponseModal from "@/components/support/qna/QnAResponseModal";
import SupportQnAList from "@/components/support/qna/SupportQnAList";
import useModalState from "@/hooks/useModalState";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface QnAElement {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number | string;
  userNickname: string;
}

const SupportQnAListContainer = () => {
  const [totalElements, setTotalElements] = useState(0);
  const [elements, setElements] = useState<QnAElement[]>([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const [status, setStatus] = useState(searchParams.get("status") || "WAIT");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [activeQnA, setActiveQnA] = useState<{
    id: number;
    userNickname: string;
  }>({
    id: 0,
    userNickname: "",
  }); 
  const modalState = useModalState();
  const fetchQnAList = async () => {
    const url = `/api/qna?page=${currentPage}&status=${status}&keyword=${keyword}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    setElements(data.content || []);
    setTotalElements(data.page.totalElements || 0);
  };

  const pageHandler = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  const sortStatusHandler = (value: string) => {
    setStatus(value);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("status", value);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  const searchHandler = async () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (keyword == params.get("keyword")) return;
    keyword == "" ? params.delete("keyword") : params.set("keyword", keyword);
    params.delete("page");
    url.search = params.toString();
    await fetchQnAList();
    window.history.pushState({}, "", url.toString());
  };

  const activeQnAHandler = (id: number, userNickname: string) => {
    setActiveQnA({
      id: id,
      userNickname: userNickname,
    });
    modalState.openModal();
  };

  const onChangeKeywordHandler = (value: string) => {
    setKeyword(value);
  }

    useEffect(() => {
      fetchQnAList();
    }, [currentPage, status]);

  return (
    <>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <QnAResponseModal
          QnAInfo={activeQnA}
          closeModal={() => modalState.closeModal()}
        />
      </Modal>
      <SupportQnAList
        onChangeKeywordHandler={onChangeKeywordHandler}
        searchHandler={searchHandler}
        sortStatusHandler={sortStatusHandler}
        elements={elements}
        status={status}
        activeKeyword={searchParams.get("keyword") || ""}
        modalState={modalState}
        activeQnAHandler={activeQnAHandler}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalElements / 10)}
        pageHandler={pageHandler}
      />
    </>
  );
};

export default SupportQnAListContainer;