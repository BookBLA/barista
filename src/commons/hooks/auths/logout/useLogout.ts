import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';

export const useLogout = (logoutToggle: () => void) => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const showToast = useToastStore((state) => state.showToast);
  const resetUserInfo = useUserStore((state) => state.resetUserInfo);
  const resetStyleInfo = useStyleStore((state) => state.resetStyleInfo);

  const onClickLogout = () => {
    resetUserInfo();
    resetStyleInfo();
    logoutToggle();
    showToast({
      content: '로그아웃 하였습니다.',
    });
    removeToken();
  };

  return {
    onClickLogout,
  };
};
