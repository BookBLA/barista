import { create } from 'zustand';

interface IErrorMessageState {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  clearErrorMessage: () => void;
}

export const useErrorMessage = create<IErrorMessageState>((set) => ({
  errorMessage: '',
  setErrorMessage: (message: string) => set(() => ({ errorMessage: message })),
  clearErrorMessage: () => set(() => ({ errorMessage: '' })),
}));
