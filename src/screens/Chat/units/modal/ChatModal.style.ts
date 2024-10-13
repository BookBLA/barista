import styled from 'styled-components/native';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { colors } from '@commons/styles/variablesStyles';

// LeaveChannelModal.tsx
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

// ConfirmChatModal.tsx
export const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
  margin-bottom: 15px;
  padding: 20px 0;
  z-index: 10;
  width: ${deviceWidth};
  height: 160px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.buttonPrimary};
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.View`
  flex-direction: column;
  margin-bottom: 9px;
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const TitleText = styled.Text`
  margin-bottom: 3px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
`;

export const Text = styled.Text`
  margin-bottom: 5px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.8;
`;

export const ButtonListWrapper = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  flex: 8;
  padding: 13px 15px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${(props: any) => props.borderColor};
  background-color: ${(props: any) => props.backgroundColor};
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: any) => props.color};
`;

// EndChatModal.tsx
export const EndChatWrapper = styled.View`
  padding: 25px;
  width: 100%;
  height: 188px;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  justify-content: center;
`;

export const EndChatTextWrapper = styled.View`
  flex: 1;
`;

export const EndChatTitle = styled.Text`
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
  color: black;
`;

export const EndChatText = styled.Text`
  font-size: 12px;
  text-align: left;
  line-height: 16px;
`;

export const EndChatButton = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background-color: #ecedef;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  overflow: hidden;
`;

export const EndChatButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;
