import * as AppleAuthentication from 'expo-apple-authentication';
import { useLogin } from '../../../../../commons/hooks/useLogin';

export const useAppleLogin = () => {
  const { handleLogin } = useLogin();

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
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAppleLogin };
};
