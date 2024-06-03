import create from 'zustand';

enum IsSuccess {
  false = 'false', // 이메일 전송 전
  resend = 'resend', // 이메일 수정 후 전송
  done = 'done', // 이메일 전송 완료
  error = 'error', // 인증 코드 오류
  true = 'true', // 인증 완료
}

interface EmailStatusState {
  isSuccess: IsSuccess;
  code: string;
  time: number;
  isActive: boolean;
  setCode: (code: string) => void;
  setIsSuccess: (status: IsSuccess) => void;
  setTime: (time: number) => void;
  setIsActive: (isActive: boolean) => void;
  startTimer: () => void;
  resetTimer: () => void;
}

const useEmailStatusStore = create<EmailStatusState>((set) => ({
  isSuccess: IsSuccess.false,
  code: '',
  time: 300,
  isActive: false,
  setCode: (code) => set({ code }),
  setIsSuccess: (status) => set({ isSuccess: status }),
  setTime: (time) => set({ time }),
  setIsActive: (isActive) => set({ isActive }),
  startTimer: () => {
    set({ isActive: true });
    const interval = setInterval(() => {
      set((state) => {
        if (state.time > 0) {
          return { time: state.time - 1 };
        } else {
          clearInterval(interval);
          return { isActive: true };
        }
      });
    }, 1000);
  },
  resetTimer: () => {
    set({ time: 300 });
  },
}));

export { IsSuccess, useEmailStatusStore };
