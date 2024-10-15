import { deleteToken, getToken, ITokenStore, saveToken } from '@commons/store/auth/token/tokenStore';
import { create } from 'zustand';
import { EErrorMessage } from '../../../types/errorMessage';

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
    try {
      const emptyToken: ITokenStore = { bookbla: '', sendbird: '' };
      set({ bookblaToken: emptyToken.bookbla, sendbirdToken: emptyToken.sendbird });
      await deleteToken();
      await saveToken(emptyToken);
    } catch (error) {
      console.error('토큰 제거 중 오류 발생:', error);
      throw new Error(EErrorMessage.DELETE_TOKEN_FAILED);
    }
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
