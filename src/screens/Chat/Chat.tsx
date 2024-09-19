// @screens/Chat/ChatScreen.tsx

import { exitChatRoom, fetchChatList, switchAlert } from '@commons/api/chat/chat.api';
import { Chat as ChatType } from '@commons/api/chat/chat.types';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import WebSocketClient from '@commons/websocket/websocketClient';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import ConfirmExitModal from '@screens/Chat/modals/ConfimExit/ConfirmExitModal';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import * as S from './Chat.styles';

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExitConfirmVisible, setIsExitConfirmVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const userId = memberInfo.id;

  useHeaderControl({
    title: '채팅',
    left: false,
  });

  // 채팅 목록 로드 함수
  const loadChats = useCallback(async () => {
    try {
      const response = await fetchChatList();

      if (response.isSuccess) {
        if (response.result.length === 0) {
          setError('아직 진행 중인 대화가 없어요.\n엽서를 보내 대화를 시작해보세요.');
        } else if (Array.isArray(response.result)) {
          const formattedChats: ChatType[] = response.result.map((chatRoom) => ({
            id: chatRoom.id.toString(),
            name: chatRoom.otherMember.name,
            avatar: { uri: chatRoom.otherMember.profileImageUrl },
            lastMessage: chatRoom.lastChat ? chatRoom.lastChat : chatRoom.postcard.message,
            timestamp: new Date(
              chatRoom.lastChatTime ? chatRoom.lastChatTime : chatRoom.postcard.createdAt,
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            unreadCount: chatRoom.lastChat ? chatRoom.unreadCount : chatRoom.unreadCount + 1,
            partner: chatRoom.otherMember,
            postcard: chatRoom.postcard,
            isAlert: chatRoom.isAlert,
          }));

          // 상태 변경을 강제하기 위해 빈 배열로 설정 후 새롭게 설정
          setChats([JSON.parse(JSON.stringify(formattedChats))][0]);

          setError('');
        }
      } else {
        setError('채팅 목록을 불러오는 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('채팅 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Failed to fetch chat list:', err);
    }
  }, []);

  // 페이지가 포커스될 때마다 채팅 목록 로드
  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [loadChats]),
  );

  // 새 메시지를 처리하는 함수
  const handleNewMessage = useCallback(async (newMessage: any) => {
    console.log(`
      ====================
      New message received!123123

      New message: ${JSON.stringify(newMessage)}
      Before chats: ${JSON.stringify(chats)}
      ====================
    `);

    await loadChats();

    // newMessage.chatRoomId에 해당하는 채팅방의 unreadCount를 1 증가시키고, lastMessage를 업데이트
    const updatedChats = chats.map((chat) => {
      if (chat.id === newMessage.chatRoomId.toString()) {
        return {
          ...chat,
          lastMessage: newMessage.content,
          timestamp: new Date(newMessage.sendTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          unreadCount: chat.unreadCount + 1,
        };
      }

      return chat;
    });

    setChats(updatedChats);
  }, []);

  useEffect(() => {
    // WebSocket 연결 설정
    const connectWebSocket = async () => {
      WebSocketClient.subscribe(handleNewMessage, `/topic/chat/${userId.toString()}`);
    };

    connectWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 구독 해제 및 연결 해제
    return () => {
      WebSocketClient.unsubscribe(`/topic/chat/${userId.toString()}` as string);
    };
  }, [userId, handleNewMessage]);

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

  const confirmExitChat = () => {
    setIsModalVisible(false);
    setIsExitConfirmVisible(true);
  };

  const handleExitChat = () => {
    if (selectedChat) {
      exitChatRoom(selectedChat.id);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== selectedChat.id));
      setIsExitConfirmVisible(false);
      closeModal();
    }
  };

  const handleSwitchAlert = () => {
    if (selectedChat) {
      const newAlertStatus = !selectedChat.isAlert;
      switchAlert(selectedChat.id, newAlertStatus);
      setSelectedChat({ ...selectedChat, isAlert: newAlertStatus });
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === selectedChat.id ? { ...chat, isAlert: newAlertStatus } : chat)),
      );
      closeModal();
    }
  };

  const renderChatItem = ({ item }: { item: ChatType }) => (
    <View>
      <LongPressGestureHandler onHandlerStateChange={(event) => handleLongPress(event, item)} minDurationMs={800}>
        <View>
          <S.ChatItem
            onPress={() =>
              navigation.navigate('ChatDetail', {
                partner: item.partner,
                postcard: item.postcard,
                chatRoomID: Number(item.id),
                isAlert: item.isAlert,
              })
            }
          >
            <S.Avatar source={item.avatar} />
            <S.ChatInfo>
              <S.ChatName>{item.name}</S.ChatName>
              <S.LastMessage>
                {item.lastMessage.length > 20 ? `${item.lastMessage.slice(0, 15)}...` : item.lastMessage}
              </S.LastMessage>
            </S.ChatInfo>
            <S.TimeUnreadContainer>
              <S.Timestamp>{item.timestamp}</S.Timestamp>
              {item.unreadCount > 0 && (
                <S.Badge>
                  <S.BadgeText>{item.unreadCount > 99 ? '100+' : item.unreadCount}</S.BadgeText>
                </S.Badge>
              )}
            </S.TimeUnreadContainer>
          </S.ChatItem>
        </View>
      </LongPressGestureHandler>
    </View>
  );

  return (
    <>
      {error !== '' && (
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Image
            source={require('@assets/images/icons/Warning03.png')}
            style={{ width: 51, height: 51, marginBottom: 20 }}
          />
          <S.EmptyText>{error}</S.EmptyText>
        </View>
      )}
      <S.ChatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item: { id: any }) => Number(item.id)}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReachedThreshold={0.1}
        onEndReached={loadChats}
      />
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal}>
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalText>{selectedChat?.name} 채팅방</S.ModalText>
              <TouchableOpacity onPress={handleSwitchAlert}>
                <S.ButtonContainer>
                  <S.ModalIcon
                    source={
                      selectedChat?.isAlert
                        ? require('@assets/images/icons/active_alert.png')
                        : require('@assets/images/icons/unactive_alert.png')
                    }
                  />
                  <S.ModalOptionText>{selectedChat?.isAlert ? '푸시 알림 끄기' : '푸시 알림 켜기'}</S.ModalOptionText>
                </S.ButtonContainer>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmExitChat}>
                <S.ButtonContainer>
                  <S.ModalIcon source={require('@assets/images/icons/exit.png')} />
                  <S.ModalOptionText>채팅방 나가기</S.ModalOptionText>
                </S.ButtonContainer>
              </TouchableOpacity>
            </S.ModalContent>
          </S.ModalContainer>
        </TouchableOpacity>
      </Modal>

      <ConfirmExitModal
        isVisible={isExitConfirmVisible}
        onCancel={() => setIsExitConfirmVisible(false)}
        onExit={handleExitChat}
      />
    </>
  );
};

export default ChatScreen;
