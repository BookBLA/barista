import { postLogin } from '@commons/api/auth/login.api';
import { TAuthCode } from '@commons/api/auth/login.types';
import { useSuccessfulLogin } from '@commons/hooks/auths/successfulLogin/useSuccessfulLogin';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { getReLoginInfo } from '@commons/utils/dates/dateUtils/dateUtils';

export const useLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const handleSuccessfulLogin = useSuccessfulLogin();

  const handleLogin = async (authCode: TAuthCode, type: string) => {
    try {
      const { result } = await postLogin(authCode, type);
      if (result.memberStatus === EMemberStatus.DELETED) {
        return showToast({
          content: `${getReLoginInfo(result.deletedAt)}`,
        });
      }
      await handleSuccessfulLogin(result);
    } catch (error) {
      // TODO: 전체적인 로그인 로직 리팩토링 예정 -> 에러 메세지 중앙에서 관리 예정(에러 메세지 더 상세히 유저에게 전달)
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
