import { useCallback } from 'react';
import { useMemberPostcardStore } from '../store/useMemberPostcardStore';
import { useFocusEffect } from '@react-navigation/native';

const useFetchMemberPostcard = () => {
  const { fetchMemberPostcard, memberPostcard } = useMemberPostcardStore();

  useFocusEffect(
    useCallback(() => {
      fetchMemberPostcard();
    }, []),
  );

  return { memberPostcard };
};

export default useFetchMemberPostcard;
