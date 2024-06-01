import { useCallback, useState } from 'react';
import { getReceivePostcardList } from '../../../../../commons/api/matching.api';
import { IReceivePostcardProps } from '../../../../Matching/Postcard/Receive/ReceivePostcard.types';
import { useFocusEffect } from '@react-navigation/native';

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
