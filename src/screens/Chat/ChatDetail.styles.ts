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

export const profileSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const profileAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 15px;
`;

export const profileInfo = styled.View`
  flex: 1;
`;

export const profileSchool = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 3px;
  color: #333;
`;

export const profileDetails = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const libraryButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-radius: 20px;
  align-self: flex-start;
`;

export const libraryButtonText = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
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

// img
export const readReceipt = styled.Image`
  width: 16px;
  height: 8px;
  margin-bottom: 3px;
`;

export const timestamp = styled.Text<{ isUserMessage: boolean }>`
  font-size: 11px;
  color: #999999;
  margin-top: 2px;
  align-self: flex-end;
  margin: 0 4px;
`;

export const readStatus = styled.View<{ isUserMessage: boolean }>`
  margin-top: 2px;
  margin-left: 4px;
  align-self: flex-end;
  display: ${(props) => (props.isUserMessage ? 'flex' : 'none')};
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
  tint-color: #ffffff;
`;

export const backButton = styled.TouchableOpacity`
  padding: 5px;
`;
