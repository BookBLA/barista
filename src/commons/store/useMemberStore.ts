import { create } from 'zustand';
import { getToken, saveToken } from './tokenStore';
import { getMemberApi } from '../api/member.api';

interface IMemberInfo {
  memberInfo: {
    id: 0;
    oauthEmail: string;
    oauthProfileImageUrl: string;
    memberType: string;
    memberStatus: string;
  };
  saveMemberInfo: () => void;
}

const useMemberStore = create<IMemberInfo>((set) => ({
  memberInfo: {
    id: 0,
    oauthEmail: '',
    oauthProfileImageUrl: '',
    memberType: '',
    memberStatus: '',
  },
  saveMemberInfo: async () => {
    const response = await getMemberApi();
    const memberInfo = response.result;
    if (memberInfo) {
      set({ memberInfo });
    }
  },
}));

export default useMemberStore;
