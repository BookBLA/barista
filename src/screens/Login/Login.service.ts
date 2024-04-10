import * as AppleAuthentication from 'expo-apple-authentication';
import { postLogin } from '../../commons/api/login.api';

export const handleAppleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const authCode = credential.authorizationCode;

    const result = await postLogin(String(authCode), 'apple');
    // console.log('result', result);
    // console.log('authCode', authCode);
  } catch (error) {
    console.error(error);
  }
};
