import useAnalyticsEventLogger from '../../../../../commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { useLogin } from '../../../../../commons/hooks/auths/login/useLogin';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleKakaoLogin = async (authCode: string) => {
    try {
      await handleLogin(String(authCode), 'kakao');
      await logEvent('login', { method: 'apple' });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleKakaoLogin,
  };
};
