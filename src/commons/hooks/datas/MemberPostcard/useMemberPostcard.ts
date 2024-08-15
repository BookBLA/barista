import { useMemberPostcardStore } from '@commons/store/members/postcard/useMemberPostcardStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const useFetchMemberPostcard = () => {
  // TODO: 훅 대신 zustand 함수안에 api 호출하는 함수를 만들어서 데이터 가져오기
  const { fetchMemberPostcard, memberPostcard } = useMemberPostcardStore();

  useFocusEffect(
    useCallback(() => {
      fetchMemberPostcard();
    }, []),
  );

  return { memberPostcard };
};

export default useFetchMemberPostcard;
