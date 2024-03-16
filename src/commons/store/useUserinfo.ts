import create from 'zustand';

interface UserInfo {
  aggredStatues: boolean[];
  gender: string;
  birthDate: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
  studentIdImageUrl: string;
  schoolEmail: string;
  profileImageUrl: string;
}

interface UserState {
  userInfo: UserInfo;
  updateUserInfo: (field: keyof UserInfo, value: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: {
    aggredStatues: [],
    gender: '',
    birthDate: '',
    name: '',
    phoneNumber: '',
    schoolName: '',
    studentIdImageUrl: '',
    schoolEmail: '',
    profileImageUrl: '',
  },
  updateUserInfo: (field, value) => set((state) => ({ userInfo: { ...state.userInfo, [field]: value } })),
}));
