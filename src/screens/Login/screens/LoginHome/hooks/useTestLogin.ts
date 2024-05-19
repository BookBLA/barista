import { postTestSignUp } from '../../../../../commons/api/example.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import usePushToken from '../../../../../commons/hooks/usePushToken';
import useAuthStore from '../../../../../commons/store/useAuthStore';
import useToastStore from '../../../../../commons/store/useToastStore';

export const useTestLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const showToast = useToastStore((state) => state.showToast);
  const { getPushToken } = usePushToken();
  const { handleReset } = useMovePage();

  const handleTestLogin = async () => {
    try {
      const { result } = await postTestSignUp({
        email: 'test11108@naver.com',
      });
      setToken(result.accessToken);
      if (result.memberStatus !== 'p') {
        getPushToken();
      }

      showToast({ content: '테스트 로그인에 성공하였습니다.' });
      handleReset('tapScreens');
    } catch (error) {
      console.error('error', error);
      showToast({ content: '테스트 로그인에 실패하였습니다.' });
    }
  };

  return { handleTestLogin };
};
