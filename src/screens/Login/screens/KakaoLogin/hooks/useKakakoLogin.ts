import { TAuthCode } from '@commons/api/auth/login.types';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { useLogin } from '@commons/hooks/auths/login/useLogin';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleKakaoLogin = async (authCode: TAuthCode) => {
    try {
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
