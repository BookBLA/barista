import { getAccessToken, login, me } from '@react-native-kakao/user';
import { useLogin } from '@commons/hooks/auths/login/useLogin';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { EErrorMessage } from '@commons/types/errorMessage';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleKakaoLogin = async () => {
    try {
      // TODO: SDK사용시 authCode 사용 불가로 인해 백엔드 로직 수정 후 적용예정
      await login().then((result) => console.log('login', result));
      await me().then((result) => console.log('me', result));
      await getAccessToken().then((result) => console.log('getAccessToken', result));
      // if (authCode === null) {
      //   throw new Error(EErrorMessage.KAKAO_AUTH_CODE);
      // }
      //
      // await handleLogin(authCode, 'kakao');
      // FIXME: method kakoa 써도 되는지?? 다른 코드에는 모두 apple로 되어있음.
      await logEvent('login', { method: 'kakao' });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleKakaoLogin };
};
