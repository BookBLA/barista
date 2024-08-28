import { create } from 'zustand';

interface IErrorMessageState {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
}

// TODO: 성진 - 토스트 스토어로 대체할 예정
export const useErrorMessage = create<IErrorMessageState>((set) => ({
  errorMessage: '',
  setErrorMessage: (message: string) => set(() => ({ errorMessage: message })),
  clearErrorMessage: () => set(() => ({ errorMessage: '' })),
}));
