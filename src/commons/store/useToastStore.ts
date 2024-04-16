import { create } from 'zustand';

interface IToastMessage {
  content: string;
  type?: string; // 추후에 error, info, success 등.. 필요할 상황이 생길 수 있어 고려해서 만듬
}

interface IToastState {
  toast: IToastMessage | null;
  showToast: (message: IToastMessage) => void;
  hideToast: () => void;
}

const useToastStore = create<IToastState>((set) => ({
  toast: null,
  showToast: (message: IToastMessage) => set({ toast: message }),
  hideToast: () => set({ toast: null }),
}));

export default useToastStore;
