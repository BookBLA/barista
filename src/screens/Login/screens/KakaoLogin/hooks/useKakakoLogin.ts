import { useLogin } from '../../../../../commons/hooks/useLogin';
import useAnalyticsEventLogger from '../../../../../commons/hooks/useAnalyticsEventLogger';

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
