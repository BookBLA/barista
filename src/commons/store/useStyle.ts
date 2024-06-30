import { create } from 'zustand';

interface StyleInfo {
  mbti: string;
  smokeType: string;
  drinkType: string;
  contactType: string;
  dateStyleType: string;
  dateCostType: string;
  justFriendType: string;
  heightType: string;
  memberAsk: string;
}

interface StyleState {
  styleInfo: StyleInfo;
  updateStyleInfo: (field: keyof StyleInfo, value: string) => void;
  resetStyleInfo: () => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  styleInfo: {
    mbti: 'ESTJ',
    smokeType: '',
    drinkType: '',
    contactType: '',
    dateStyleType: '',
    dateCostType: '',
    justFriendType: '',
    heightType: '',
    memberAsk: '',
  },
  updateStyleInfo: (field, value) => set((state) => ({ styleInfo: { ...state.styleInfo, [field]: value } })),
  resetStyleInfo: () =>
    set({
      styleInfo: {
        // Reset styleInfo to initial state
        mbti: 'ESTJ',
        smokeType: '',
        drinkType: '',
        contactType: '',
        dateStyleType: '',
        dateCostType: '',
        justFriendType: '',
        heightType: '',
        memberAsk: '',
      },
    }),
}));
