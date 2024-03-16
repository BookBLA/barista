import { create } from 'zustand';

interface IPostcardCounter {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const usePostcardCounter = create<IPostcardCounter>((set) => ({
  count: 100,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
