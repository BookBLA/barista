import { create } from 'zustand';

interface StyleInfo {
  mbti: string;
  smokeType: string;
  height: number;
  profileImageTypeId: number;
}

interface StyleState {
  styleInfo: StyleInfo;
  updateStyleInfo: (field: keyof StyleInfo, value: string | number) => void;
  resetStyleInfo: () => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  styleInfo: {
    mbti: 'ESTJ',
    smokeType: '',
    height: 0,
    profileImageTypeId: 0,
  },
  updateStyleInfo: (field, value) => set((state) => ({ styleInfo: { ...state.styleInfo, [field]: value } })),
  resetStyleInfo: () =>
    set({
      styleInfo: {
        mbti: 'ESTJ',
        smokeType: '',
        height: 0,
        profileImageTypeId: 0,
      },
    }),
}));
