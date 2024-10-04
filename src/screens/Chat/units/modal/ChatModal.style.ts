import styled from 'styled-components/native';

export const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  width: 80%;
  padding: 24px 24px 12px 24px;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
`;

export const ModalText = styled.Text`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 32px;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const ModalButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
