import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { colors } from '@commons/styles/variablesStyles';
import StudentIdContent from './StudentIdContent';

interface IModal {
  isOpen: boolean;
  studentIdToggle: () => void;
}

export const getStudentIdConfig = (modal: IModal) => {
  const { isOpen, studentIdToggle } = modal;
  const { movePage } = useMovePage();

  const moveNext = () => {
    movePage('studentId')();
    studentIdToggle();
  };
  return {
    visible: isOpen,
    onClose: studentIdToggle,
    mode: 'round',
    contents: <StudentIdContent />,
    buttons: [
      { label: '나중에 하기', action: studentIdToggle, bgColor: colors.buttonMain, color: 'black' },
      {
        label: '지금 인증하기',
        action: moveNext,
      },
    ],
  };
};
