import { Text } from 'react-native';

const ModalTitle = () => {
  return (
    <Text
      style={{
        color: 'black',
        fontFamily: 'fontMedium',
        fontSize: 16,
        justifyContent: 'flex-start',
      }}
    >
      생년월일을 설정해 주세요.
    </Text>
  );
};

export default ModalTitle;
