import { postLogin } from '@commons/api/auth/login.api';
import { useSuccessfulLogin } from '@commons/hooks/auths/successfulLogin/useSuccessfulLogin';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { getReLoginInfo } from '@commons/utils/dates/dateUtils/dateUtils';

export const useLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const handleSuccessfulLogin = useSuccessfulLogin();

  const handleLogin = async (authCode: string, type: string) => {
    try {
      const { result } = await postLogin(authCode, type);
      if (result.memberStatus === EMemberStatus.DELETED) {
        return showToast({
          content: `${getReLoginInfo(result.deletedAt)}`,
        });
      }
      await handleSuccessfulLogin(result);
    } catch (error) {
      showToast({
        content: '로그인에 실패하였습니다.',
      });
      console.error(error);
    }
  };

  return {
    handleLogin,
  };
};
