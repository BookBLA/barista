import { postTestSignUp } from '../../../../../commons/api/example.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import useGetPushToken from '../../../../../commons/hooks/useGetPushToken';
import useAuthStore from '../../../../../commons/store/useAuthStore';
import useToastStore from '../../../../../commons/store/useToastStore';
import { usePostPushToken } from '../../../../../commons/hooks/usePostPushToken';

export const useTestLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const showToast = useToastStore((state) => state.showToast);
  const { getPushToken } = useGetPushToken();
  const { handleReset } = useMovePage();
  const { postPushToken } = usePostPushToken();

  const handleTestLogin = async () => {
    try {
      const { result } = await postTestSignUp({
        email: 'tjdwls6536@naver.com',
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
