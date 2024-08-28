import { getMemberApi } from '@commons/api/members/default/member.api';
import { MemberResponse } from '@commons/types/openapiGenerator';
import analytics from '@react-native-firebase/analytics';
import { create } from 'zustand';

interface IMemberInfo {
  memberInfo: MemberResponse;
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
    memberGender: '',
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
    if (memberInfo) {
      set({ memberInfo });
    }
  },
}));

export default useMemberStore;
