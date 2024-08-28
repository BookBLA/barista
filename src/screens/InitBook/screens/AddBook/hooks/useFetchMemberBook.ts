import { getMemberBookApi } from '@commons/api/members/book/memberBook.api';
import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import { MemberBookReadResponse } from '@commons/types/openapiGenerator';
import { useEffect, useState } from 'react';

export const useFetchMemberBook = () => {
  const [data, setData] = useState<MemberBookReadResponse[]>([]);

  const fetchGetMemberBook = async () => {
    try {
      const response = await getMemberBookApi();
      const { memberBookReadResponses } = response.result ?? {};
      if (!memberBookReadResponses) return;
      setData(memberBookReadResponses);
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
