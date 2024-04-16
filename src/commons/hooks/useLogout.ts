import useAuthStore from '../store/useAuthStore';
import useToastStore from '../store/useToastStore';

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const showToast = useToastStore((state) => state.showToast);

  const onClickLogout = () => {
    showToast({
      content: '로그아웃 하였습니다.',
    });
    removeToken();
  };

  return {
    onClickLogout,
  };
};
