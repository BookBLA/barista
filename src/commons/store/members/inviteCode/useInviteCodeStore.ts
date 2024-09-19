import { create } from 'zustand';

enum IsSuccess {
  false = 'false', // 초기
  error = 'error', // 실패
  true = 'true', // 완료
}

interface IncviteCodeState {
  isSuccess: IsSuccess | null;
  code: string | null;
  setCode: (code: string) => void;
  setIsSuccess: (status: IsSuccess) => void;
  resetInviteCodeStore: () => void;
}

const useInviteCodeStore = create<IncviteCodeState>((set) => ({
  isSuccess: null,
  code: null,
  setCode: (code) => set({ code }),
  setIsSuccess: (status) => set({ isSuccess: status }),
  resetInviteCodeStore: () => {
    set({ isSuccess: IsSuccess.false, code: null });
  },
}));

export { IsSuccess, useInviteCodeStore };
