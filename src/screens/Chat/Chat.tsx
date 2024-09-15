import { fetchChatList } from '@commons/api/chat/chat.api';
import { Chat as ChatType } from '@commons/api/chat/chat.types';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import * as S from './Chat.styles';

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useHeaderControl({
    title: '채팅',
    left: false,
  });

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetchChatList();

        if (response.result.length === 0) {
          setError('채팅 목록이 없습니다.');
        } else if (response.isSuccess && Array.isArray(response.result)) {
          setChats(response.result);
        } else {
          setError('채팅 목록을 불러올 수 없습니다.');
        }
      } catch (error) {
        const dummyChats: ChatType[] = [
          {
            id: '1',
            name: '김철수',
            avatar: require('@assets/images/img/profile_ex2.png'),
            lastMessage: '안녕하세요!',
            timestamp: '오후 3:01',
            unreadCount: 1,
            smokingStatus: '흡연',
            school: '서울대학교',
            mbti: 'INFP',
            height: 180,
          },
          {
            id: '2',
            name: '홍길동',
            avatar: require('@assets/images/img/profile_ex1.png'),
            lastMessage: '반갑습니다.',
            timestamp: '오후 3:02',
            unreadCount: 0,
            smokingStatus: '비흡연',
            school: '연세대학교',
            mbti: 'ENFP',
            height: 175,
          },
          {
            id: '3',
            name: '이영희',
            avatar: require('@assets/images/img/profile_ex3.png'),
            lastMessage: '만나서 반가워요!',
            timestamp: '오후 3:03',
            unreadCount: 0,
            smokingStatus: '흡연',
            school: '고려대학교',
            mbti: 'INTJ',
            height: 170,
          },
        ];
        setChats(dummyChats);
        console.error('Failed to fetch chat list:', error);
        setError('채팅 목록을 불러오는 중 오류가 발생했습니다.');
      }
    };

    loadChats();
  }, []);

  const openModal = (chat: ChatType) => {
    setSelectedChat(chat);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedChat(null);
  };

  const handleLongPress = (event: any, chat: ChatType) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      openModal(chat);
    }
  };

  const renderChatItem = ({ item }: { item: ChatType }) => (
    <View>
      <LongPressGestureHandler onHandlerStateChange={(event) => handleLongPress(event, item)} minDurationMs={800}>
        <View>
          <S.ChatItem onPress={() => navigation.navigate('ChatDetail', { partner: item })}>
            <S.Avatar source={item.avatar} />
            <S.ChatInfo>
              <S.ChatName>{item.name}</S.ChatName>
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
        </View>
      </LongPressGestureHandler>
    </View>
  );

  if (error) {
    return (
      <S.EmptyWrapper>
        <Image
          source={require('@assets/images/icons/Warning.png')} // 이미지 경로 수정
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <S.EmptyText>{error}</S.EmptyText>
      </S.EmptyWrapper>
    );
  }

  return (
    <>
      <S.ChatList data={chats} renderItem={renderChatItem} keyExtractor={(item: { id: any }) => item.id} />
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal}>
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalText>{selectedChat?.name} 채팅방</S.ModalText>
              <TouchableOpacity
                onPress={() => {
                  // 푸시 알람 끄기 로직 구현
                  console.log('푸시 알람 끄기');
                  closeModal();
                }}
              >
                <S.ButtonContainer>
                  <S.ModalIcon source={require('@assets/images/icons/unactive_alert.png')} />
                  <S.ModalOptionText>푸시 알람 끄기</S.ModalOptionText>
                </S.ButtonContainer>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // 채팅방 나가기 로직 구현
                  console.log('채팅방 나가기');
                  closeModal();
                }}
              >
                <S.ButtonContainer>
                  <S.ModalIcon source={require('@assets/images/icons/exit.png')} />
                  <S.ModalOptionText>채팅방 나가기</S.ModalOptionText>
                </S.ButtonContainer>
              </TouchableOpacity>
            </S.ModalContent>
          </S.ModalContainer>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ChatScreen;
