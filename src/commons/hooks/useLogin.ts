import { postLogin } from '../api/login.api';
import useToastStore from '../store/useToastStore';
import { EStatusCode } from '../types/statusCode';
import { isAxiosErrorResponse } from '../utils/isAxiosErrorResponse';
import { useSuccessfulLogin } from './useSuccessfulLogin';

export const useLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const handleSuccessfulLogin = useSuccessfulLogin();

  const handleLogin = async (authCode: string, type: string) => {
    try {
      const { result } = await postLogin(authCode, type);
      await handleSuccessfulLogin(result);
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        const { code, message } = error.response.data;
        if (code === EStatusCode.LOGIN_002) {
          showToast({
            content: message ?? '회원 탈퇴 후 30일이 지나야 로그인이 가능합니다.',
          });
        } else {
          showToast({
            content: '로그인에 실패하였습니다.',
          });
          console.error(error);
        }
      }
    }
  };

  return {
    handleLogin,
  };
};
