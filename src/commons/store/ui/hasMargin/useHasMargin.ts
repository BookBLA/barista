import { create } from 'zustand';

interface IUseHasMargin {
  hasMargin: boolean;
  setHasMargin: (value: boolean) => void;
}

export const useHasMargin = create<IUseHasMargin>((set) => ({
  hasMargin: true,
  setHasMargin: (value) => set(() => ({ hasMargin: value })),
}));
