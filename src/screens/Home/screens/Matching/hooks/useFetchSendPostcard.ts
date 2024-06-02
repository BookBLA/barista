import { useCallback, useState } from 'react';
import { getSendPostcardList } from '../../../../../commons/api/matching.api';
import { ISendPostcardProps } from '../../../../Matching/Postcard/Send/SendPostcard.types';
import { useFocusEffect } from '@react-navigation/native';

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
