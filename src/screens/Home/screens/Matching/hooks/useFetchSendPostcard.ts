import { getSendPostcardList } from '@commons/api/matching/matching.api';
import { useFocusEffect } from '@react-navigation/native';
import { ISendPostcardProps } from '@screens/Matching/Postcard/Send/SendPostcard.types';
import { useCallback, useState } from 'react';

export const useFetchSendPostcard = (isReceivePostcard: boolean) => {
  const [data, setData] = useState<ISendPostcardProps[]>([]);

  const fetchSendPostcard = useCallback(async () => {
    try {
      const response = await getSendPostcardList();
      setData(response ?? []);
    } catch (error) {
      console.error('error', error);
    }
  }, [isReceivePostcard]);

  useFocusEffect(
    useCallback(() => {
      fetchSendPostcard();
    }, [isReceivePostcard]),
  );

  return data;
};
