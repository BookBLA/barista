import { postTestSignUp } from '../../../../../commons/api/example/example.api';
import useMovePage from '../../../../../commons/hooks/navigations/movePage/useMovePage';
import useGetPushToken from '../../../../../commons/hooks/notifications/getPushToken/useGetPushToken';
import { usePostPushToken } from '../../../../../commons/hooks/notifications/postPushToken/usePostPushToken';
import useAuthStore from '../../../../../commons/store/auth/auth/useAuthStore';
import useToastStore from '../../../../../commons/store/ui/toast/useToastStore';

export const useTestLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const showToast = useToastStore((state) => state.showToast);
  const { getPushToken } = useGetPushToken();
  const { handleReset } = useMovePage();
  const { postPushToken } = usePostPushToken();

  const handleTestLogin = async () => {
    if (process.env.NODE_ENV !== 'development') return;
    try {
      const { result } = await postTestSignUp({
        email: 'junhee043@naver.com',
      });
      setToken(result.accessToken);

      const pushToken = await getPushToken();
      await postPushToken(pushToken);

      showToast({ content: '테스트 로그인에 성공하였습니다.' });
      handleReset('tapScreens');
    } catch (error) {
      console.error('error', error);
      showToast({ content: '테스트 로그인에 실패하였습니다.' });
    }
  };

  return { handleTestLogin };
};
