import * as AppleAuthentication from 'expo-apple-authentication';
import { useLogin } from '../../../../../commons/hooks/useLogin';
import useAnalyticsEventLogger from '../../../../../commons/hooks/useAnalyticsEventLogger';

export const useAppleLogin = () => {
  const { handleLogin } = useLogin();
  const logEvent = useAnalyticsEventLogger();

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const authCode = credential.authorizationCode;
      await handleLogin(String(authCode), 'apple');
      await logEvent('login', { method: 'apple' });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAppleLogin };
};
