import { getMemberBookApi } from '@commons/api/members/book/memberBook.api';
import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import { useEffect, useState } from 'react';

export const useFetchMemberBook = () => {
  const [data, setData] = useState([]);

  const fetchGetMemberBook = async () => {
    try {
      const response = await getMemberBookApi();
      setData(response.result?.memberBookReadResponses);
    } catch (error) {
      if (error instanceof Error) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchGetMemberBook();
  }, []);

  return {
    data,
    fetchGetMemberBook,
  };
};
