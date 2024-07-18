import { MouseEvent, useState } from "react";

interface IPaginationProps {
  refetch: any;
  endPage: number;
}

const Pagination = ({ refetch, endPage }: IPaginationProps) => {
  // 페이지 1개당 보여줄 갯수
  const [perPageCount, setPerPageCount] = useState(10); // eslint-disable-line no-unused-vars
  // 마지막 페이지
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // const endPage = Math.ceil(Number(pageCount) / perPageCount);

  // 아래 보여줄 페이지 번호들
  const movePage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === "prev") {
      setStartPage((prev) => prev - 10);
      setCurrentPage((prev) => prev - 10);
      refetch(currentPage - 10 );
    } else if (event.currentTarget.id === "morePrev") {
      setStartPage(1);
      setCurrentPage(1);
      refetch(1);
    } else if (event.currentTarget.id === "next") {
      setStartPage((prev) => (prev + 10 <= endPage ? prev + 10 : endPage));
      setCurrentPage((prev) => (prev + 10 <= endPage ? prev + 10 : endPage));
      refetch(currentPage + 10 <= endPage ? currentPage + 10 : endPage);
    } else if (event.currentTarget.id === "moreNext") {
      if (endPage % 10 === 0) {
        const temp = endPage - 9;
        setStartPage(temp);
        setCurrentPage(temp);
        refetch(temp);
      } else {
        const temp = endPage - (endPage % 10) + 1;
        setStartPage(temp);
        setCurrentPage(temp);
        refetch(temp);
      }
    } else {
      if (event.target instanceof Element) {
        setCurrentPage(+event.target.id);
        refetch(+event.target.id);
      }
    }
  };

  return (
    <div className="flex w-full justify-center">
      {startPage === 1 || (
        <button className={"w-[3.125rem] aspect-square flex justify-center items-center"} id="morePrev" onClick={movePage}>
          ◀◀
        </button>
      )}
      {startPage === 1 || (
        <button className={"w-[3.125rem] aspect-square flex justify-center items-center"} id="prev" onClick={movePage}>
          ◀
        </button>
      )}
      {new Array(10).fill(1).map(
        (_, index) =>
          Number(index) + Number(startPage) <= Number(endPage) && (
            <button className={`w-[3.125rem] aspect-square flex justify-center items-center ${startPage + index === currentPage ? "text-[1.5rem] text-red-600" : "text-[1rem] text-black"} `}
              key={index + startPage}
              id={String(startPage + index)}
              onClick={movePage}
            >
              {index + startPage}
            </button>
          ),
      )}

      {startPage + 10 > endPage || (
        <button className={"w-[3.125rem] aspect-square flex justify-center items-center"} id="next" onClick={movePage}>
          ▶
        </button>
      )}
      {startPage + 10 > endPage || (
        <button className={"w-[3.125rem] aspect-square flex justify-center items-center"} id="moreNext" onClick={movePage}>
          ▶▶
        </button>
      )}
    </div>
  );
};

export default Pagination;


