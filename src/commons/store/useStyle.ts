import { create } from 'zustand';

interface StyleInfo {
  mbti: string;
  smokeTypes: string;
  drinkTypes: string;
  contactTypes: string;
  dateStyleTypes: string;
  dateCostTypes: string;
  justFriendTypes: string;
  memberAsk: string;
}

interface StyleState {
  styleInfo: StyleInfo;
  updateStyleInfo: (field: keyof StyleInfo, value: string) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  styleInfo: {
    mbti: '',
    smokeTypes: '',
    drinkTypes: '',
    contactTypes: '',
    dateStyleTypes: '',
    dateCostTypes: '',
    justFriendTypes: '',
    memberAsk: '',
  },
  updateStyleInfo: (field, value) => set((state) => ({ styleInfo: { ...state.styleInfo, [field]: value } })),
}));
