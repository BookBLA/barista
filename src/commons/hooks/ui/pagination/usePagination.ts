import { useState } from 'react';

const usePagination = (pageSize = 5, initPage = 1, dataLength = 10) => {
  const [pageIndex, setPageIndex] = useState(initPage);
  const [startPage, setStartPage] = useState(initPage);
  const [totalPage, setTotalPage] = useState(-1);

  const movePageIndex = (pageIndex: number) => () => {
    setPageIndex(pageIndex);
  };

  // TODO: 성진 - 문자열 비교 대신 이넘타입으로 비교하기
  const changePageGroup = (direction: string) => () => {
    const newStartPage = direction === 'next' ? startPage + pageSize : startPage - pageSize;
    if (newStartPage > 0 && newStartPage <= Math.ceil(totalPage / dataLength)) {
      setStartPage(newStartPage);
      setPageIndex(newStartPage);
    }
  };

  const nextEndPage = () => {
    const total = Math.ceil(totalPage / dataLength);
    const lastPage = !(totalPage % dataLength) ? 0 : 1;
    const resultPage = total - (total % pageSize) + lastPage;

    setStartPage(resultPage);
    setPageIndex(resultPage);
  };

  const prevEndPage = () => {
    setPageIndex(initPage);
    setStartPage(initPage);
  };

  return {
    movePageIndex,
    changePageGroup,
    nextEndPage,
    prevEndPage,
    pageIndex,
    startPage,
    totalPage,
    pageSize,
    initPage,
    setTotalPage,
  };
};

export default usePagination;
