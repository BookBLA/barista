import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { useLogin } from '@commons/hooks/auths/login/useLogin';
import { EErrorMessage } from '@commons/types/errorMessage';
import { login } from '@react-native-kakao/user';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleKakaoLogin = async () => {
    try {
      const result = await login();
      const authCode = result.accessToken;
      if (!authCode) {
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
