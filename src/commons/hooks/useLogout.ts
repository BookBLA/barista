import useAuthStore from '../store/useAuthStore';
import { useStyleStore } from '../store/useStyle';
import useToastStore from '../store/useToastStore';
import { useUserStore } from '../store/useUserinfo';

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
