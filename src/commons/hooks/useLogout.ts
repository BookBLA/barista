import useAuthStore from '../store/useAuthStore';
import { saveToken } from '../utils/tokenStore';

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
