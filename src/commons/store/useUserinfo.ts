import { create } from 'zustand';
import { getMemberProfileApi, patchMemberProfileImageApi, putMemberProfileApi } from '../api/memberProfile.api';
import analytics from '@react-native-firebase/analytics';

interface UserInfo {
  memberId: string;
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
  updateUserInfo: (newUser: Partial<UserInfo>) => Promise<void>;
  resetUserInfo: () => void;
  saveUserInfo: (newUser: Partial<UserInfo>) => Promise<void>;
  updateProfileImageUrl: (imageUrl: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  userInfo: {
    memberId: '',
    name: '',
    birthDate: '',
    gender: '',
    schoolName: '',
    schoolEmail: '',
    phoneNumber: '',
    profileImageUrl: '',
    openKakaoRoomUrl: '',
    studentIdImageUrl: '',
  },
  updateUserInfo: async (newUser) => {
    set((state) => ({ userInfo: { ...state.userInfo, ...newUser } }));
  },
  resetUserInfo: () =>
    set({
      userInfo: {
        memberId: '',
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
  saveUserInfo: async (newUser) => {
    try {
      const { result } = await getMemberProfileApi();
      set((state) => ({ userInfo: { ...result, ...newUser } }));
      await analytics().setUserId(String(get().userInfo.memberId));
      await analytics().setUserProperties({ ...get().userInfo });
      await putMemberProfileApi(get().userInfo);
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  },
  updateProfileImageUrl: async (imageUrl) => {
    try {
      await patchMemberProfileImageApi({ profileImageUrl: imageUrl });
      set((state) => ({ userInfo: { ...state.userInfo, profileImageUrl: imageUrl } }));
    } catch (error) {
      console.error('Failed to update profile image:', error);
    }
  },
}));
