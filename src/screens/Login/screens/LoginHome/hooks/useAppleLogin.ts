import * as AppleAuthentication from 'expo-apple-authentication';
import useAuthStore from '../../../../../commons/store/useAuthStore';
import useToastStore from '../../../../../commons/store/useToastStore';
import useGetPushToken from '../../../../../commons/hooks/useGetPushToken';
import { postLogin } from '../../../../../commons/api/login.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import { useInitialRouteName } from '../../../../../commons/hooks/useInitialRouteName';
import { usePostPushToken } from '../../../../../commons/hooks/usePostPushToken';

export const useAppleLogin = () => {
  const getInitialRouteName = useInitialRouteName();
  const setToken = useAuthStore((state) => state.setToken);
  const showToast = useToastStore((state) => state.showToast);
  const { getPushToken } = useGetPushToken();
  const { handleReset } = useMovePage();
  const { postPushToken } = usePostPushToken();

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const authCode = credential.authorizationCode;
      const { result } = await postLogin(String(authCode), 'apple');
      setToken(result.accessToken);
      if (result.memberStatus !== 'p') {
        const pushToken = await getPushToken();
        await postPushToken(pushToken);
      }

      showToast({ content: '애플 로그인에 성공하였습니다.' });
      handleReset(getInitialRouteName());
    } catch (error) {
      showToast({ content: '애플 로그인에 실패하였습니다.' });
      console.error(error);
    }
  };

  return { handleAppleLogin };
};
