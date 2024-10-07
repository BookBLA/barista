import {getMemberApi, GetMyInfoApi} from '@commons/api/members/default/member.api';
// import { MemberResponse } from '@commons/types/openapiGenerator';
import { getMemberProfileApi } from '@commons/api/members/profile/memberProfile.api';
import analytics from '@react-native-firebase/analytics';
import { create } from 'zustand';
import { EStudentIdImageStatus } from './MemberInfo.types';

interface IMemberInfo {
  memberInfo: {
    id: number;
    name: string;
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
  resetMemberInfo: () => void;
}

const useMemberStore = create<IMemberInfo>((set) => ({
  memberInfo: {
    id: 0,
    name: '',
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
    const membersResponse = await getMemberApi();
    const memberName = await GetMyInfoApi();
    const { id, memberType, memberStatus, memberGender } = membersResponse.result;
    await analytics().setUserId(String(id));
    await analytics().setUserProperties({
      user_id: String(id),
      type: String(memberType),
      status: String(memberStatus),
      gender: String(memberGender),
    });
    const memberInfo = membersResponse.result;
    const memberNameInfo = memberName.result;
    // console.log('memberInfo', memberInfo);
    if (memberInfo) {
      set({ memberInfo: { ...memberInfo, name: memberNameInfo.name } });
    }
    return memberStatus as string;
  },
  resetMemberInfo: () =>
    set(() => ({
      memberInfo: {
        id: 0,
        name: '',
        oauthEmail: '',
        oauthProfileImageUrl: '',
        memberType: '',
        memberStatus: '',
        memberGender: '',
        studentIdImageStatus: null,
        schoolStatus: null,
      },
    })),
}));

export default useMemberStore;
