import { colors } from '../../../../../commons/styles/variablesStyles';
import LogOutContent from '../units/LogOutContent/LogOutContent';

interface IModal {
  isLogout: boolean;
  logoutToggle: () => void;
}

export const getLogoutConfig = (modal: IModal, onClickLogout: () => void) => {
  const { isLogout, logoutToggle } = modal;

  return {
    visible: isLogout,
    onClose: logoutToggle,
    mode: 'round',
    contents: <LogOutContent />,
    buttons: [
      {
        label: '로그아웃',
        action: () => {
          onClickLogout();
        },
        bgColor: colors.buttonMain,
        color: 'black',
      },
      { label: '취소', action: logoutToggle },
    ],
  };
};
