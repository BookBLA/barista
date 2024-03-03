import { Text, View } from 'react-native';
import { CustomModal } from '../CustomModal/CustomModal';
import { useErrorMessage } from '../../store/useErrorMessage';

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
      <View>
        <Text>{errorMessage}</Text>
      </View>
    </CustomModal>
  );
};

export default GlobalErrorModal;
