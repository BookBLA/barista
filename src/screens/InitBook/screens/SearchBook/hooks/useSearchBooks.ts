import { getSearchBookApi } from '@commons/api/search/searchBook';
import { BookSearchResponse } from '@commons/types/openapiGenerator';
import { Dispatch, SetStateAction, useState } from 'react';

export const useSearchBooks = (setTotalPage: Dispatch<SetStateAction<number>>) => {
  const [bookList, setBookList] = useState<BookSearchResponse[]>([]);
  const [resultSearch, setResultSearch] = useState('');

  const callGetSearchBookApi = async (search: string, pageIndex: number, updateTotalPages = false) => {
    try {
      setResultSearch(search);
      const response = await getSearchBookApi(search, pageIndex);
      const { totalCount, bookSearchResponses } = response?.result ?? {};
      if (updateTotalPages && totalCount) {
        setTotalPage(totalCount);
      }
      // NOTE: 검색 버튼을 클릭 시에만 TotalPage 변경하기 위해 사용
      setBookList(bookSearchResponses ?? []);
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
