// Chat.tsx
import { fetchChatList } from '@commons/api/chat/chat.api';
import { Chat as ChatType } from '@commons/api/chat/chat.types';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import * as S from './Chat.styles';

const ChatScreen: React.FC = () => {
  // 컴포넌트 이름을 ChatScreen으로 변경
  const [chats, setChats] = useState<ChatType[]>([]);
  const [, setError] = useState('');
  const navigation = useNavigation();
  useHeaderControl({
    title: '채팅',
    left: false,
  });

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetchChatList();
        if (response.isSuccess && Array.isArray(response.result)) {
          setChats(response.result);
        } else {
          setError('채팅 목록을 불러올 수 없습니다.');
        }
      } catch (error) {
        // 더미 데이터 생성
        const dummyChats: ChatType[] = [
          {
            id: '1',
            name: '김철수',
            avatar: require('@assets/images/img/profile_ex2.png'),
            lastMessage:
              '안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!안녕하세요!',
            timestamp: '오후 3:01',
            unreadCount: 1,
          },
          {
            id: '2',
            name: '홍길동',
            avatar: require('@assets/images/img/profile_ex1.png'),
            lastMessage: '반갑습니다.',
            timestamp: '오후 3:02',
            unreadCount: 0,
          },
          {
            id: '3',
            name: '이영희',
            avatar: require('@assets/images/img/profile_ex3.png'),
            lastMessage: '만나서 반가워요!',
            timestamp: '오후 3:03',
            unreadCount: 0,
          },
        ];

        setChats(dummyChats);

        console.error('Failed to fetch chat list:', error);
        setError('채팅 목록을 불러오는 중 오류가 발생했습니다.');
      }
    };

    loadChats();
  }, []);

  const renderChatItem = ({ item }: { item: ChatType }) => (
    <S.ChatItem onPress={() => navigation.navigate('ChatDetail', { user: item })}>
      <S.Avatar source={item.avatar} />
      <S.ChatInfo>
        <S.ChatName>{item.name}</S.ChatName>
        {/* if lastMessage가 20글자 이상이면 그 뒤에는 ...으로 대체 */}
        <S.LastMessage>
          {item.lastMessage.length > 20 ? `${item.lastMessage.slice(0, 15)}...` : item.lastMessage}
        </S.LastMessage>
      </S.ChatInfo>
      <S.Timestamp>{item.timestamp}</S.Timestamp>
      {item.unreadCount > 0 && (
        <S.Badge>
          <S.BadgeText>{item.unreadCount > 99 ? '100+' : item.unreadCount}</S.BadgeText>
        </S.Badge>
      )}
    </S.ChatItem>
  );

  // if (error) {
  //   return (
  //     <S.EmptyWrapper>
  //       <Image
  //         source={require('@assets/images/icons/Warning.png')} // 이미지 경로 수정
  //         style={{ width: 100, height: 100, marginBottom: 20 }}
  //       />
  //       <S.EmptyText>{error}</S.EmptyText>
  //     </S.EmptyWrapper>
  //   );
  // }

  return <S.ChatList data={chats} renderItem={renderChatItem} keyExtractor={(item: { id: any }) => item.id} />;
};

export default ChatScreen; // 변경된 컴포넌트 이름으로 export
