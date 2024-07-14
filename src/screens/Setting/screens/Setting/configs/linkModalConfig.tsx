import { colors } from '../../../../../commons/styles/variablesStyles';
import OuterLinkModalContent from '../units/ModalContent/OuterLinkModalContent';

interface IState {
  isOpen: boolean;
  toggle: () => void;
}

export const getLinkModalConfig = (state: IState, handleMoveOuterLink: () => void) => {
  return {
    visible: state.isOpen,
    onClose: state.toggle,
    mode: 'round',
    contents: <OuterLinkModalContent />,
    buttons: [
      { label: '돌아가기', action: state.toggle, bgColor: colors.buttonMain, color: 'black' },
      { label: '이동하기', action: handleMoveOuterLink },
    ],
  };
};
