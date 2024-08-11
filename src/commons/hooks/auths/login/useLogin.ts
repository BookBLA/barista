import { postLogin } from '../../../api/auth/login.api';
import useToastStore from '../../../store/useToastStore';
import { EMemberStatus } from '../../../types/memberStatus';
import { getReLoginInfo } from '../../../utils/dateUtils';
import { useSuccessfulLogin } from '../successfulLogin/useSuccessfulLogin';

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
