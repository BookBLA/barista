import useAuthStore from '../store/useAuthStore';
import { saveToken } from '../store/tokenStore';

export const useLogout = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const onClickLogout = () => {
    setToken('');
    saveToken('');
  };

  return {
    onClickLogout,
  };
};
