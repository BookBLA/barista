import { getReceivePostcardList } from '@commons/api/matching/matching.api';
import { useFocusEffect } from '@react-navigation/native';
import { IReceivePostcardProps } from '@screens/Matching/Postcard/Receive/ReceivePostcard.types';
import { useCallback, useState } from 'react';

export const useFetchReceivePostcard = (isReceivePostcard: boolean) => {
  const [data, setData] = useState<IReceivePostcardProps[]>([]);

  const fetchReceivePostcard = useCallback(async () => {
    try {
      const response = await getReceivePostcardList();
      setData(response ?? []);
    } catch (error) {
      console.error('error', error);
    }
  }, [isReceivePostcard]);

  useFocusEffect(
    useCallback(() => {
      fetchReceivePostcard();
    }, [isReceivePostcard]),
  );

  return data;
};
