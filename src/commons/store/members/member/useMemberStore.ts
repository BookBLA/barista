import { getMemberApi } from '@commons/api/members/default/member.api';
// import { MemberResponse } from '@commons/types/openapiGenerator';
import analytics from '@react-native-firebase/analytics';
import { create } from 'zustand';
import { EStudentIdImageStatus } from './MemberInfo.types';

interface IMemberInfo {
  memberInfo: {
    id: number;
    oauthEmail: string;
    oauthProfileImageUrl: string;
    memberType: string;
    memberStatus: string;
    memberGender: string;
    studentIdImageStatus: EStudentIdImageStatus | null;
    schoolStatus: string | null;
  };
  saveMemberInfo: () => Promise<string>;
  updateMemberInfo: (field: string, value: string | number) => void;
}

const useMemberStore = create<IMemberInfo>((set) => ({
  memberInfo: {
    id: 0,
    oauthEmail: '',
    oauthProfileImageUrl: '',
    memberType: '',
    memberStatus: '',
    memberGender: '',
    studentIdImageStatus: null,
    schoolStatus: null,
  },
  updateMemberInfo: (field, value) => set((state) => ({ memberInfo: { ...state.memberInfo, [field]: value } })),
  saveMemberInfo: async () => {
    const response = await getMemberApi();
    const { id, memberType, memberStatus, memberGender } = response.result;
    await analytics().setUserId(String(id));
    await analytics().setUserProperties({
      user_id: String(id),
      type: String(memberType),
      status: String(memberStatus),
      gender: String(memberGender),
    });
    const memberInfo = response.result;
    // console.log('memberInfo', memberInfo);
    if (memberInfo) {
      set({ memberInfo });
    }
    return memberStatus as string;
  },
}));

export default useMemberStore;
