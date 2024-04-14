import { create } from 'zustand';

interface UserInfo {
  gender: string;
  birthDate: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
  studentIdImageUrl: string;
  schoolEmail: string;
  profileImageUrl: string;
  openKakaoRoomUrl: string;
}

interface UserState {
  userInfo: UserInfo;
  updateUserInfo: (field: keyof UserInfo, value: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: {
    gender: '',
    birthDate: '',
    name: '',
    phoneNumber: '',
    schoolName: '',
    studentIdImageUrl: '',
    schoolEmail: '',
    profileImageUrl: '',
    openKakaoRoomUrl: '',
  },
  updateUserInfo: (field, value) => set((state) => ({ userInfo: { ...state.userInfo, [field]: value } })),
}));
