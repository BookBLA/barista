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
  updateUserInfo: (newUser: object) => Promise<void>;
  resetUserInfo: () => void;
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
  updateUserInfo: async (newUser) => set((state) => ({ userInfo: { ...state.userInfo, ...newUser } })),
  resetUserInfo: () =>
    set({
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
    }),
}));
