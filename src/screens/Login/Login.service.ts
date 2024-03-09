import * as AppleAuthentication from 'expo-apple-authentication';
import { postAppleLogin } from '../../commons/api/login.api';

export const handleAppleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const authCode = credential.authorizationCode;

    const result = await postAppleLogin(String(authCode));
    console.log('result', result);

    // credential에서 인증 코드를 추출합니다.
    console.log('authCode', authCode);
  } catch (e) {
    console.log('실패');
    console.error('error: {}', e);
  }
};
