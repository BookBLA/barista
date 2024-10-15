import { EStudentIdImageStatus } from '@commons/store/members/member/MemberInfo.types';
import useToastStore from '@commons/store/ui/toast/useToastStore';

export const useApprovalStatus = () => {
  const showToast = useToastStore((state) => state.showToast);

  const handleApprovalStatus = (studentStatus: string, toggle: () => void) => {
    if (studentStatus === EStudentIdImageStatus.PENDING) {
      return showToast({
        content: '학생증 승인 대기 중입니다.',
      });
    }
    if (studentStatus === EStudentIdImageStatus.UNREGISTER || studentStatus === EStudentIdImageStatus.DENIAL) {
      return toggle();
    }

    return showToast({
      content: '학생증 심사 중입니다',
    });
  };

  return {
    handleApprovalStatus,
  };
};
