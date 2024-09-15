// Chat.styles.ts
import styled from 'styled-components/native';

export const ChatList = styled.FlatList`
  flex: 1;
  background-color: #ffffff;
`;

export const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eaeaea;
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

export const LastMessage = styled.Text`
  font-size: 14px;
  color: #888;
  /* 최대 글자수 제한 */
  /* 20글자 넘어가면 ...으로 뒤에 생략 */
`;

export const Timestamp = styled.Text`
  font-size: 12px;
  color: #999;
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

export const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 10px;
`;
