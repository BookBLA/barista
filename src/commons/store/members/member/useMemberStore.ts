import { getMemberApi, GetMyInfoApi } from '@commons/api/members/default/member.api';
// import { MemberResponse } from '@commons/types/openapiGenerator';
import { EMemberStatus } from '@commons/types/memberStatus';
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
  saveMemberInfo: () => Promise<string | undefined>;
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
    try {
      const membersResponse = await getMemberApi();
      const { id, memberType, memberStatus, memberGender } = membersResponse?.result ?? {};

      let memberName = '';
      if (memberStatus !== EMemberStatus.STYLE && memberStatus !== EMemberStatus.PROFILE) {
        const response = await GetMyInfoApi();
        memberName = response?.result?.name ?? '';
      }

      await analytics().setUserId(String(id));
      await analytics().setUserProperties({
        user_id: String(id),
        type: String(memberType),
        status: String(memberStatus),
        gender: String(memberGender),
      });
      const memberInfo = membersResponse?.result ?? {};
      // console.log('memberInfo', memberInfo);
      if (memberInfo) {
        set({ memberInfo: { ...memberInfo, name: memberName } });
      }
      return memberStatus as string;
    } catch (err) {
      return null;
    }
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
