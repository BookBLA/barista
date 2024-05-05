import { Dispatch, SetStateAction, useState } from 'react';
import { getSearchBookApi } from '../../../../../commons/api/searchBook';

export const useSearchBooks = (setTotalPage: Dispatch<SetStateAction<number>>) => {
  const [bookList, setBookList] = useState([]);
  const [resultSearch, setResultSearch] = useState('');

  const callGetSearchBookApi = async (search: string, pageIndex: number, updateTotalPages = false) => {
    try {
      setResultSearch(search);
      const response = await getSearchBookApi(search, pageIndex);
      if (updateTotalPages && response.result.totalCount !== undefined) {
        setTotalPage(response.result.totalCount);
      } // 검색 버튼을 클릭 시에만 TotalPage 변경하기 위해 사용
      setBookList(response.result.bookSearchResponses);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    bookList,
    resultSearch,
    callGetSearchBookApi,
  };
};
