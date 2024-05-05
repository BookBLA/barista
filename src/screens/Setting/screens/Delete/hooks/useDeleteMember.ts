import { deleteMemberApi } from '../../../../../commons/api/member.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import useAuthStore from '../../../../../commons/store/useAuthStore';
import useToastStore from '../../../../../commons/store/useToastStore';

export const useDeleteMember = () => {
  const { movePage } = useMovePage();
  const showToast = useToastStore((state) => state.showToast);
  const removeToken = useAuthStore((state) => state.removeToken);

  const callDeleteMember = (isOpen: boolean) => async () => {
    if (!isOpen) {
      return showToast({
        content: '회원탈퇴 동의를 해주세요.',
      });
    }
    try {
      await deleteMemberApi();
      removeToken();
      movePage('login')();
    } catch {
      showToast({
        content: '회원탈퇴에 실패하였습니다.',
      });
    }
  };

  return {
    callDeleteMember,
  };
};
