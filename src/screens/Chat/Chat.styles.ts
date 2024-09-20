import styled from 'styled-components/native';

export const ChatList = styled.FlatList`
  flex: 1;
  background-color: white;
`;

export const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 12px;
`;

export const ChatInfo = styled.View`
  flex: 1;
  gap: 8px;
`;

export const ChatName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const isAlertIcon = styled.Image`
  margin-left: 5px;
  width: 15px;
  height: 15px;
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: #888;
`;

export const TimeUnreadContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-start;
`;

export const Timestamp = styled.Text`
  font-size: 12px;
  color: #858585;
  align-self: flex-end;
`;

export const Badge = styled.View`
  background-color: red;
  border-radius: 10px;
  padding: 2px 6px;
  margin-top: 4px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 12px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ModalIcon = styled.Image`
  width: 15px;
  height: 15px;
  align-self: center;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const ModalOptionText = styled.Text`
  padding: 10px;
  font-size: 16px;
`;

export const ModalCloseText = styled.Text`
  padding: 10px;
  color: red;
  text-align: center;
`;

export const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  text-align: center;
`;
