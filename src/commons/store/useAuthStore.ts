import { create } from 'zustand';

interface IAuth {
  token: string | null;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<IAuth>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
