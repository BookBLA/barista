import { useCallback, useEffect, useState } from 'react';
import { getReceivePostcardList } from '../../../../../commons/api/matching.api';
import { IReceivePostcardProps } from '../../../../Matching/Postcard/Receive/ReceivePostcard.types';

export const useFetchReceivePostcard = () => {
  const [data, setData] = useState<IReceivePostcardProps[]>([]);

  const fetchReceivePostcard = useCallback(async () => {
    const params: Record<string, string> = {};

    try {
      const response = await getReceivePostcardList();
      setData(response ?? []);
    } catch (error) {
      console.error('error', error);
    }
  }, []);

  useEffect(() => {
    fetchReceivePostcard();
  }, [fetchReceivePostcard]);

  return data;
};
