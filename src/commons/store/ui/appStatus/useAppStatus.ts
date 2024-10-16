import { create } from 'zustand';

interface IAppStatusState {
  hasMargin: boolean;
  isBackgroundColor: string;
}

interface IAppStatus {
  status: IAppStatusState;
  setStatus: (newStatus: Partial<IAppStatusState>) => void;
  resetStatus: () => void;
  getStatus: () => IAppStatusState;
}

const initialStatus: IAppStatusState = {
  hasMargin: true,
  isBackgroundColor: '#fff',
};

export const useAppStatus = create<IAppStatus>((set, get) => ({
  status: initialStatus,
  getStatus: () => get().status,
  setStatus: (newStatus) =>
    set((state) => ({
      status: { ...state.status, ...newStatus },
    })),
  resetStatus: () => set({ status: initialStatus }),
}));
