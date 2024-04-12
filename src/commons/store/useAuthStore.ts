import { create } from 'zustand';
import { getToken, saveToken } from './tokenStore';

interface IAuth {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
  initializeToken: () => Promise<void>;
}

const useAuthStore = create<IAuth>((set) => ({
  token: '',
  setToken: (token) => {
    set({ token });
    saveToken(token);
  },
  removeToken: async () => {
    set({ token: '' });
    await saveToken('');
  },
  initializeToken: async () => {
    const token = await getToken();
    if (token) {
      set({ token });
    }
  },
}));

export default useAuthStore;
