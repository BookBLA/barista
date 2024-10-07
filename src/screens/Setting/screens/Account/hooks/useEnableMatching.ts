import { postMemberStatusesApi } from '@commons/api/members/default/member.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { MemberStatusUpdateRequestMemberStatusEnum } from '@commons/types/openapiGenerator';
import { useState } from 'react';

export const useEnableMatching = (toggle: () => void) => {
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const { movePage } = useMovePage();

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

  const onClickEnableMatching = () => {
    if (EMemberStatus.COMPLETED === memberStatus) {
      toggle();
    } else if (EMemberStatus.MATCHING_DISABLED === memberStatus) {
      handleEnableMatching(EMemberStatus.COMPLETED);
    } else {
      console.log('MMMemberStatus', memberStatus);
      movePage('studentId')();
    }
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
