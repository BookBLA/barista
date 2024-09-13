import { getMemberPostcardsApi } from '@commons/api/members/default/member.api';
import { create } from 'zustand';

interface IMemberPostcardState {
  memberPostcard: number;
  fetchMemberPostcard: () => Promise<void>;
  isLoading: boolean;
  error: unknown;
}

export const useMemberPostcardStore = create<IMemberPostcardState>((set) => ({
  memberPostcard: 10, // TODO: getMemberPostcardApi가 deprecated되어 임의로 수정. 원래 0
  isLoading: false,
  error: null,

  fetchMemberPostcard: async () => {
    set({ isLoading: true });
    try {
      const response = await getMemberPostcardsApi();
      set({ memberPostcard: response.result, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
