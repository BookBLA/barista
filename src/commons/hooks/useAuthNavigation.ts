import { useEffect, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import { TRootStackParamList } from '../components/CustomNavigator/CustomNavigator.types';
import { NavigationContainerRef } from '@react-navigation/native';

export const useAuthNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // NOTE: 토큰이 없을 경우 로그인 페이지로 이동하기 위해 사용
    if (!token && navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'loginStack' }],
      });
    }
  }, [token]);

  return navigationRef;
};
