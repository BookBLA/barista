import { create } from 'zustand';

interface ICounter {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = create<ICounter>((set) => ({
  count: 0, // 선언 및 선언값 등록
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  //   : () => set((state, prev) => ({ count: state.count + prev.count })), // state는 현재 상태, prev는 이전 상태
}));
