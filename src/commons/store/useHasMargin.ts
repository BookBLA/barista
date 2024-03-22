import { create } from 'zustand';

interface IUseHasMargin {
  hasMargin: boolean;
  enableMargin: () => void;
  disableMargin: () => void;
}

export const useHasMargin = create<IUseHasMargin>((set) => ({
  hasMargin: true,
  enableMargin: () => set(() => ({ hasMargin: true })),
  disableMargin: () => set(() => ({ hasMargin: false })),
}));
