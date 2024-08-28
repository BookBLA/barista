import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { useLogin } from '@commons/hooks/auths/login/useLogin';
import { EErrorMessage } from '@commons/types/errorMessage';
import * as AppleAuthentication from 'expo-apple-authentication';

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
      if (authCode === null) {
        throw new Error(EErrorMessage.APPLE_AUTH_CODE);
      }

      await handleLogin(authCode, 'apple');
      await logEvent('login', { method: 'apple' });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAppleLogin };
};
