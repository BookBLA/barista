import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const HeaderTitle = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-top: 2px;
`;

export const SmallAvatar = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ProfileSection = styled.View`
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
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

export const ProfileSchool = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
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

export const DateSeparator = styled.View`
  align-items: center;
  margin-vertical: 10px;
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: #666666;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const MessageItem = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding-horizontal: 15px;
`;

export const MessageAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
`;

export const MessageContent = styled.View<{ sender: 'user' | 'partner' }>`
  flex: 1;
  align-items: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
`;

export const MessageUsername = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
`;

export const MessageBubble = styled.View<{ sender: 'user' | 'partner' }>`
  background-color: ${({ sender }) => (sender === 'user' ? '#1D2E61' : '#f1f1f1')};
  padding: 10px;
  border-radius: 12px;
  max-width: 75%;
`;

export const MessageText = styled.Text<{ sender: 'user' | 'partner' }>`
  font-size: 14px;
  color: ${({ sender }) => (sender === 'user' ? '#ffffff' : '#000000')};
`;

export const Timestamp = styled.Text<{ sender: 'user' | 'partner' }>`
  font-size: 10px;
  color: #999999;
  ${({ sender }) => (sender === 'user' ? 'margin-left: 8px' : 'margin-right: 8px')};
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin: 20px 0;
`;

export const TopButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  width: 45px;
  height: 45px;
  bottom: 70px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: #ffffff;
  opacity: 0.8;
`;

export const TopButtonIcon = styled(Icon)`
  font-size: 20px;
  transform: rotate(90deg);
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 10px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

// img로 대체
export const SendButtonIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const styles = {
  backButton: {
    padding: 5,
    marginRight: 10,
  },
};
