import { create } from 'zustand';

interface IAppStatusState {
  hasMargin: boolean;
  isBackgroundColor: string;
}

interface IAppStatus {
  status: IAppStatusState;
  setStatus: (newStatus: Partial<IAppStatusState>) => void;
}

export const useAppStatus = create<IAppStatus>((set) => ({
  status: {
    hasMargin: true,
    isBackgroundColor: '#fff',
  },
  setStatus: (newStatus) =>
    set((state) => ({
      status: { ...state.status, ...newStatus },
    })),
}));
