import create from 'zustand';

interface StyleInfo {
  mbtiList: string[];
  mbti: string;
  smokeTypes: string;
  drinkTypes: string;
  contactTypes: string;
  dateStyleTypes: string;
  dateCostTypes: string;
  justFriendTypes: string;
}

interface StyleState {
  styleInfo: StyleInfo;
  updateStyleInfo: (field: keyof StyleInfo, value: string) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  styleInfo: {
    mbtiList: [],
    mbti: '',
    smokeTypes: '',
    drinkTypes: '',
    contactTypes: '',
    dateStyleTypes: '',
    dateCostTypes: '',
    justFriendTypes: '',
  },
  updateStyleInfo: (field, value) => set((state) => ({ styleInfo: { ...state.styleInfo, [field]: value } })),
}));
