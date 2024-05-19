import { postLogin } from '../../../../../commons/api/login.api';
import { useInitialRouteName } from '../../../../../commons/hooks/useInitialRouteName';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import usePushToken from '../../../../../commons/hooks/usePushToken';
import useAuthStore from '../../../../../commons/store/useAuthStore';
import useMemberStore from '../../../../../commons/store/useMemberStore';
import useToastStore from '../../../../../commons/store/useToastStore';

export const useKakaoLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const setToken = useAuthStore((state) => state.setToken);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);
  const getInitialRouteName = useInitialRouteName();
  const { handleReset } = useMovePage();

  const { getPushToken } = usePushToken();

  const callPostLogin = async (authCode: string) => {
    try {
      const { result } = await postLogin(authCode, 'kakao');
      setToken(result.accessToken);
      if (result.memberStatus !== 'p') {
        getPushToken();
      }
      await saveMemberInfo();
      showToast({
        content: '로그인에 성공하였습니다.',
      });
      handleReset(getInitialRouteName());
    } catch (error) {
      console.log('error', error);
      showToast({
        content: '로그인에 실패하였습니다.',
      });
    }
  };

  return {
    callPostLogin,
  };
};
