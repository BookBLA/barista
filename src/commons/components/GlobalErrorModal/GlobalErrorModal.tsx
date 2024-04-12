import { Text } from 'react-native';
import { CustomModal } from '../CustomModal/CustomModal';
import { useErrorMessage } from '../../store/useErrorMessage';
import { Wrapper } from './GlobalErrorModal.styles';

const GlobalErrorModal = () => {
  const { errorMessage, clearErrorMessage } = useErrorMessage();

  const modalConfig = {
    visible: !!errorMessage,
    onClose: clearErrorMessage,
    close: true,
    mode: 'round',
    buttons: [{ label: '닫기', action: clearErrorMessage }],
  };

  return (
    <CustomModal modalConfig={modalConfig}>
      <Wrapper>
        <Text>{errorMessage}</Text>
      </Wrapper>
    </CustomModal>
  );
};

export default GlobalErrorModal;
