import { useLogin } from '../../../../../commons/hooks/useLogin';

export const useKakaoLogin = () => {
  const { handleLogin } = useLogin();

  const handleKakaoLogin = async (authCode: string) => {
    try {
      await handleLogin(String(authCode), 'kakao');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleKakaoLogin,
  };
};
