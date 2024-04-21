import { useEffect, useState } from 'react';
import { getMemberBookApi } from '../../../../../commons/api/memberBook.api';
import { useErrorMessage } from '../../../../../commons/store/useErrorMessage';

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
