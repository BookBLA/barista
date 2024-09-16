// @screens/Chat/ChatDetail.styles.ts

import styled from 'styled-components/native';

// 공통 스타일 변수
const colors = {
  primary: '#1D2E61',
  background: '#ffffff',
  text: '#333',
  subText: '#666',
  borderColor: '#e0e0e0',
};

const spacing = {
  small: '10px',
  medium: '20px',
  large: '30px',
};

// 메인 컨테이너
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

// 헤더 스타일
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.small};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderColor};
`;

export const HeaderTitle = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-left: ${spacing.small};
`;

export const SmallAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 8px;
`;

export const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const ProfileSection = styled.View`
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  margin-bottom: 20px;
`;

export const ProfileAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

export const ProfileInfo = styled.View`
  align-items: center;
`;

export const ProfileName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const ProfileSchool = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

export const ProfileDetails = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

export const LibraryButton = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
`;

export const LibraryButtonText = styled.Text`
  font-size: 14px;
  color: #007aff;
`;

export const MessageItem = styled.View`
  margin-bottom: 12px;
  padding-horizontal: 15px;
`;

export const MessageItemInner = styled.View<{ isUserMessage: boolean }>`
  flex-direction: row;
  justify-content: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const MessageAvatar = styled.Image`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 18px;
`;

export const MessageContent = styled.View<{ isUserMessage: boolean }>`
  flex: 1;
  max-width: 70%;
  align-self: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const MessageUsername = styled.Text`
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const MessageRow = styled.View<{ isUserMessage: boolean }>`
  align-items: flex-end;
  flex-direction: row;
  justify-content: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const BookChatBubble = styled.View<{ isUserMessage: boolean }>`
  padding-bottom: 0;
`;

export const BookCover = styled.Image<{ isUserMessage: boolean }>`
  align-self: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
  width: 100px;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 4px;
`;

export const MessageBubble = styled.View<{ isUserMessage: boolean }>`
  padding: 10px;
  max-width: 100%;
  border-radius: 18px;
  background-color: ${(props) => (props.isUserMessage ? colors.primary : '#f1f1f1')};
`;

export const MessageText = styled.Text<{ isUserMessage: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isUserMessage ? '#ffffff' : '#000000')};
`;

export const ScrollToBottomButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  background-color: ${colors.background};
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: ${spacing.small};
  border-top-width: 1px;
  border-top-color: ${colors.borderColor};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 16px;
`;

export const SendButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
`;

export const SendButtonIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const DateSeparator = styled.View`
  align-items: center;
  margin-vertical: 15px;
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: #666666;
  background-color: #f0f0f0;
  padding-vertical: 3px;
  padding-horizontal: 8px;
  border-radius: 10px;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin: 20px;
`;

export const Timestamp = styled.Text<{ isUserMessage: boolean }>`
  font-size: 11px;
  color: #999999;
  margin: 0 4px;
`;

export const DeclineModal = styled.View`
  width: 320px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const ModalDescription = styled.Text`
  margin-bottom: 20px;
  color: #555;
  text-align: center;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding-horizontal: 10px;
`;

export const DeclineButton = styled.TouchableOpacity`
  padding: 14px 36px;
  background-color: #f5e1c4;
  border-radius: 20px;
  align-items: center;
  margin-right: 5px;
`;

export const DeclineButtonText = styled.Text`
  color: #333;
  font-weight: bold;
`;

export const ReviewButton = styled.TouchableOpacity`
  padding: 14px 36px;
  background-color: ${colors.primary};
  border-radius: 20px;
  align-items: center;
  margin-left: 5px;
`;

export const ReviewButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
