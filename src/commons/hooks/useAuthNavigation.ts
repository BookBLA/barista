import { useEffect, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import useMemberStore from '../store/useMemberStore';
import { TRootStackParamList } from '../components/CustomNavigator/CustomNavigator.types';
import { NavigationContainerRef } from '@react-navigation/native';

export const useAuthNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null);
  const token = useAuthStore((state) => state.token);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);

  useEffect(() => {
    // 토큰이 없을 경우 로그인 페이지로 이동하기 위해 사용
    if (!token && navigationRef.current) {
      navigationRef.current.navigate('login');
      // TODO: 성진 - 로그인 페이지로 이동할 때 스택 초기화가 필요함
    } else {
      saveMemberInfo();
    }
  }, [token]);

  return {
    navigationRef,
  };
};
