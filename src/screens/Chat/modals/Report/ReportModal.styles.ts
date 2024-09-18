import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

export const ModalSubtitle = styled.Text`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-bottom: 20px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

export const Checkbox = styled.View<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.selected ? '#1D2E61' : 'transparent')};
  margin-right: 10px;
`;

export const CheckboxLabel = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const DescriptionInput = styled.TextInput`
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align-vertical: top;
`;

export const DescriptionText = styled.Text`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

export const ReportButton = styled.TouchableOpacity`
  background-color: #1d2e61;
  border-radius: 20px;
  padding: 15px;
  align-items: center;
`;

export const ReportButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
