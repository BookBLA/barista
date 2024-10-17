import { postMemberStatusesApi } from '@commons/api/members/default/member.api';
import { useStudentIdStatus } from '@commons/hooks/datas/studentIdStatus/useStudentIdStatus';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { EStudentIdImageStatus } from '@commons/store/members/member/MemberInfo.types';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { MemberStatusUpdateRequestMemberStatusEnum } from '@commons/types/openapiGenerator';
import { useState } from 'react';

export const useEnableMatching = (toggle: () => void) => {
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const { movePage } = useMovePage();
  const showToast = useToastStore((state) => state.showToast);
  const { getStudentIdStatus } = useStudentIdStatus();

  const handleEnableMatching = async (memberStatus: MemberStatusUpdateRequestMemberStatusEnum) => {
    try {
      await postMemberStatusesApi({
        memberStatus,
        reason: memberStatus === EMemberStatus.COMPLETED ? '' : (reason ?? selected),
      });
      updateMemberInfo('memberStatus', memberStatus);
    } catch (err) {
      console.log('err', err);
    } finally {
      if (memberStatus === EMemberStatus.MATCHING_DISABLED) {
        setReason('');
        setSelected('');
        toggle();
      }
    }
  };

  const onClickEnableMatching = async () => {
    if (EMemberStatus.COMPLETED === memberStatus) {
      return toggle();
    }

    if (EMemberStatus.MATCHING_DISABLED === memberStatus) {
      return handleEnableMatching(EMemberStatus.COMPLETED);
    }

    const studentIdImageStatus = await getStudentIdStatus();
    const isIdCheckPending = EStudentIdImageStatus.PENDING === studentIdImageStatus;
    if (isIdCheckPending) {
      return showToast({
        content: '학생증 승인 대기 중입니다.',
      });
    }

    movePage('studentId')();
  };

  return {
    selected,
    setSelected,
    reason,
    setReason,
    handleEnableMatching,
    onClickEnableMatching,
  };
};
