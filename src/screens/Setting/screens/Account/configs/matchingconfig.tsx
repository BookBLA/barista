import { EMemberStatus } from '@commons/types/memberStatus';
import { MemberStatusUpdateRequestMemberStatusEnum } from '@commons/types/openapiGenerator';
import { Dispatch, SetStateAction } from 'react';
import MatchingContent from '../units/MatchingContent/MatchingContent';

interface IModal {
  isMatching: boolean;
  matchingToggle: () => void;
}

interface IState {
  reason: string;
  setReason: Dispatch<SetStateAction<string>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const getMatchingConfig = (
  handleEnableMatching: (memberStatus: MemberStatusUpdateRequestMemberStatusEnum) => void,
  modal: IModal,
  state: IState,
) => {
  const { isMatching, matchingToggle } = modal;
  const { reason, setReason, selected, setSelected } = state;
  return {
    visible: isMatching,
    onClose: matchingToggle,
    mode: 'round',
    contents: <MatchingContent reason={reason} setReason={setReason} selected={selected} setSelected={setSelected} />,
    buttons: [{ label: '비활성화하기', action: () => handleEnableMatching(EMemberStatus.MATCHING_DISABLED) }],
  };
};
