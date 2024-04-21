import { useState } from 'react';

const usePagination = (size = 5, initPage = 1) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  // useEffect(() => {
  //   if (totalPage) {
  //     prevEndPage();
  //   }
  // }, [totalPage]);

  const movePageIndex = (pageIndex: number) => () => {
    setPageIndex(pageIndex);
  };

  const changePageGroup = (direction: string) => () => {
    const newStartPage = direction === 'next' ? startPage + 5 : startPage - 5;
    if (newStartPage > 0 && newStartPage <= Math.ceil(totalPage / 10)) {
      setStartPage(newStartPage);
      setPageIndex(newStartPage);
    }
  };

  const nextEndPage = () => {
    const total = Math.ceil(totalPage / 10);
    const lastPage = !(totalPage % 10) ? 0 : 1;
    const resultPage = total - (total % 5) + lastPage;

    setStartPage(resultPage);
    setPageIndex(resultPage);
  };

  const prevEndPage = () => {
    setPageIndex(1);
    setStartPage(1);
  };

  return {
    movePageIndex,
    changePageGroup,
    nextEndPage,
    prevEndPage,
    pageIndex,
    startPage,
    totalPage,
    size,
    initPage,
    setTotalPage,
  };
};

export default usePagination;
