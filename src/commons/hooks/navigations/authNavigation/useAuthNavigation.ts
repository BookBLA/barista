import { TRootStackParamList } from '@commons/components/Navigations/CustomNavigator/CustomNavigator.types';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import { NavigationContainerRef } from '@react-navigation/native';
import { useEffect, useRef } from 'react';

export const useAuthNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null);
  const bookblaToken = useAuthStore((state) => state.bookblaToken);
  const sendbirdToken = useAuthStore((state) => state.sendbirdToken);

  useEffect(() => {
    // NOTE: 토큰이 없을 경우 로그인 페이지로 이동하기 위해 사용
    if (!bookblaToken && !sendbirdToken && navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'loginStack' }],
      });
    }
  }, [bookblaToken, sendbirdToken]);

  return navigationRef;
};
