import { getToken, saveToken, ITokenStore } from '@commons/store/auth/token/tokenStore';
import { create } from 'zustand';

interface IAuth {
  bookblaToken: string;
  sendbirdToken: string;
  setToken: (tokens: ITokenStore) => void;
  removeToken: () => Promise<void>;
  initializeToken: () => Promise<ITokenStore | null>;
}

const useAuthStore = create<IAuth>((set) => ({
  bookblaToken: '',
  sendbirdToken: '',
  setToken: (tokens: ITokenStore) => {
    if (tokens.bookbla) {
      set({ bookblaToken: tokens.bookbla });
    }
    if (tokens.sendbird) {
      set({ sendbirdToken: tokens.sendbird });
    }
    saveToken(tokens);
  },
  removeToken: async () => {
    const emptyToken: ITokenStore = { bookbla: '', sendbird: '' };
    set({ bookblaToken: emptyToken.bookbla, sendbirdToken: emptyToken.sendbird });
    await saveToken(emptyToken);
  },
  initializeToken: async () => {
    const tokens = await getToken();
    if (tokens.bookbla) {
      set({ bookblaToken: tokens.bookbla });
    }
    if (tokens.sendbird) {
      set({ sendbirdToken: tokens.sendbird });
    }
    return tokens;
  },
}));

export default useAuthStore;
