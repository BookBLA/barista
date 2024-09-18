import {
  getMemberProfileApi,
  patchMemberProfileImageApi,
  putMemberProfileApi,
} from '@commons/api/members/profile/memberProfile.api';
import { MemberProfileCreateRequestGenderEnum } from '@commons/types/openapiGenerator';
import { create } from 'zustand';

interface UserInfo {
  gender: MemberProfileCreateRequestGenderEnum;
  birthDate: string;
  name: string;
  schoolName: string;
  schoolEmail: string;
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
    name: '',
    birthDate: '',
    gender: MemberProfileCreateRequestGenderEnum.Female,
    schoolName: '',
    schoolEmail: '',
  },
  updateUserInfo: async (newUser) => {
    set((state) => ({ userInfo: { ...state.userInfo, ...newUser } }));
  },
  resetUserInfo: () =>
    set({
      userInfo: {
        gender: MemberProfileCreateRequestGenderEnum.Female,
        birthDate: '',
        name: '',
        schoolName: '',
        schoolEmail: '',
      },
    }),
  saveUserInfo: async (newUser) => {
    try {
      const { result } = await getMemberProfileApi();
      set((state) => ({ userInfo: { ...result, ...newUser } }));
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
