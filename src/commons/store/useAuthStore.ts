import { create } from 'zustand';

interface IAuth {
  token: string;
  setToken: (token: string) => void;
}

const useAuthStore = create<IAuth>((set) => ({
  token: '',
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
