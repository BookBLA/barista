import create from 'zustand';

interface QuizState {
  isSubmitQuiz: boolean;
  setIsSubmitQuiz: (value: boolean) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isSubmitQuiz: false,
  setIsSubmitQuiz: (value) => set({ isSubmitQuiz: value }),
}));
