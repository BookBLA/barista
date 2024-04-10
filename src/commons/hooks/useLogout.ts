import useAuthStore from '../store/useAuthStore';

export const useLogout = () => {
  const removeToken = useAuthStore((state) => state.removeToken);

  const onClickLogout = () => {
    removeToken();
  };

  return {
    onClickLogout,
  };
};
