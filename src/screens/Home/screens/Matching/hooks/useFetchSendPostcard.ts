import { useCallback, useEffect, useState } from 'react';
import { getSendPostcardList } from '../../../../../commons/api/matching.api';
import { ISendPostcardProps } from '../../../../Matching/Postcard/Send/SendPostcard.types';

export const useFetchSendPostcard = () => {
  const [data, setData] = useState<ISendPostcardProps[]>([]);

  const fetchSendPostcard = useCallback(async () => {
    const params: Record<string, string> = {};

    try {
      const response = await getSendPostcardList();
      setData(response ?? []);
    } catch (error) {
      console.error('error', error);
    }
  }, []);

  useEffect(() => {
    fetchSendPostcard();
  }, [fetchSendPostcard]);

  return data;
};
