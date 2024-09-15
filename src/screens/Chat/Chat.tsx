import { exitChatRoom, fetchChatList } from '@commons/api/chat/chat.api';
import { Chat as ChatType } from '@commons/api/chat/chat.types';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import WebSocketClient from '@commons/websocket/websocketClient';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import * as S from './Chat.styles'; // 스타일이 올바르게 적용되었는지 확인하세요.

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
    const ws = WebSocketClient;
    ws.connect(); // WebSocket 연결 시작

    return () => {
      ws.disconnect(); // 컴포넌트가 언마운트될 때만 WebSocket 연결 해제
    };
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetchChatList();
        console.log('Fetch response:', response);

        if (response.isSuccess && Array.isArray(response.result)) {
          const formattedChats: ChatType[] = response.result.map((chatRoom) => ({
            id: chatRoom.id.toString(),
            name: chatRoom.otherMember.name,
            avatar: { uri: chatRoom.otherMember.profileImageUrl },
            lastMessage: chatRoom.postcard.message,
            timestamp: new Date(chatRoom.postcard.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            unreadCount: chatRoom.unreadCount,
            partner: chatRoom.otherMember,
          }));

          setChats(formattedChats);
          console.log('Formatted chats:', formattedChats);
        } else {
          setError('채팅 목록을 불러올 수 없습니다.');
        }
      } catch (error) {
        setError('채팅 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('Failed to fetch chat list:', error);
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
          <S.ChatItem onPress={() => navigation.navigate('ChatDetail', { partner: item.partner })}>
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
          source={require('@assets/images/icons/Warning.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <S.EmptyText>{error}</S.EmptyText>
      </S.EmptyWrapper>
    );
  }

  return (
    <>
      <S.ChatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item: { id: any }) => item.id}
        ListEmptyComponent={<S.EmptyText>채팅 목록이 없습니다.</S.EmptyText>}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal}>
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalText>{selectedChat?.name} 채팅방</S.ModalText>
              <TouchableOpacity
                onPress={() => {
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
                  console.log('채팅방 나가기');
                  exitChatRoom(selectedChat?.id);
                  setChats(chats.filter((chat) => chat.id !== selectedChat?.id));
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
