import { create } from 'zustand';
import { getToken, saveToken } from './tokenStore';
import { getMemberApi } from '../api/member.api';
import { Field } from 'react-hook-form';

interface IMemberInfo {
  memberInfo: {
    id: 0;
    oauthEmail: string;
    oauthProfileImageUrl: string;
    memberType: string;
    memberStatus: string;
  };
  saveMemberInfo: () => Promise<void>;
  updateMemberInfo: (field: string, value: string | number) => void;
}

const useMemberStore = create<IMemberInfo>((set) => ({
  memberInfo: {
    id: 0,
    oauthEmail: '',
    oauthProfileImageUrl: '',
    memberType: '',
    memberStatus: '',
  },
  updateMemberInfo: (field, value) => set((state) => ({ memberInfo: { ...state.memberInfo, [field]: value } })),
  saveMemberInfo: async () => {
    const response = await getMemberApi();
    const memberInfo = response.result;
    if (memberInfo) {
      set({ memberInfo });
    }
  },
}));

export default useMemberStore;
