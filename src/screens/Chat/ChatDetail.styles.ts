import styled from 'styled-components/native';

export const wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
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

export const headerTitle = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-left: 10px;
`;

export const smallAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 8px;
`;

export const headerText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const dateSeparator = styled.View`
  align-items: center;
  margin-vertical: 15px;
`;

export const dateText = styled.Text`
  font-size: 12px;
  color: #666666;
  background-color: #f0f0f0;
  padding-vertical: 3px;
  padding-horizontal: 8px;
  border-radius: 10px;
`;

export const messageItem = styled.View`
  margin-bottom: 12px;
  padding-horizontal: 15px;
`;

export const messageItemInner = styled.View<{ isUserMessage: boolean }>`
  flex-direction: row;
  justify-content: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const messageAvatar = styled.Image`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 18px;
`;

export const messageContent = styled.View<{ isUserMessage: boolean }>`
  flex: 1;
  max-width: 70%;
  align-self: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const messageUsername = styled.Text`
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const messageRow = styled.View<{ isUserMessage: boolean }>`
  align-items: flex-end;
  flex-direction: row;
  justify-content: ${(props) => (props.isUserMessage ? 'flex-end' : 'flex-start')};
`;

export const BookCover = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 4px;
`;

export const messageBubble = styled.View<{ isUserMessage: boolean }>`
  padding: 10px;
  max-width: 100%;
  border-radius: 18px;
  background-color: ${(props) => (props.isUserMessage ? '#1D2E61' : '#f1f1f1')};
`;

export const messageText = styled.Text<{ isUserMessage: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isUserMessage ? '#ffffff' : '#000000')};
`;

export const readReceipt = styled.Image`
  width: 16px;
  height: 8px;
  margin-bottom: 3px;
`;

export const timestamp = styled.Text<{ isUserMessage: boolean }>`
  font-size: 11px;
  color: #999999;
  margin: 0 4px;
`;

export const BookChatBubble = styled.View`
  /* 기본 View의 하단 여백을 없애기 위해 padding-bottom: 0 */
  padding-bottom: 0;
`;

export const loadingIndicator = styled.ActivityIndicator`
  margin: 20px;
`;

export const scrollToBottomButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  background-color: #ffffff;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const inputContainer = styled.View`
  flex-direction: row;
  padding: 10px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
`;

export const textInput = styled.TextInput`
  flex: 1;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 16px;
`;

export const sendButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
`;

export const sendButtonIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const backButton = styled.TouchableOpacity`
  padding: 5px;
`;

// Decline Modal Styles
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
  background-color: #1d2e61;
  border-radius: 20px;
  align-items: center;
  margin-left: 5px;
`;

export const ReviewButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
