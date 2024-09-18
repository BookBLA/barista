import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { useLogin } from '@commons/hooks/auths/login/useLogin';
import { login } from '@react-native-kakao/user';
import { EErrorMessage } from '@commons/types/errorMessage';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleKakaoLogin = async () => {
    try {
      let authCode = '';
      await login().then((result) => {
        authCode = result.accessToken;
      });
      if (authCode === null) {
        throw new Error(EErrorMessage.KAKAO_AUTH_CODE);
      }

      await handleLogin(authCode, 'kakao');
      await logEvent('login', { method: 'apple' });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleKakaoLogin,
  };
};
