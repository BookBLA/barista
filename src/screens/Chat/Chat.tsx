// Chat.tsx

import { exitChatRoom, fetchChatList, switchAlert } from '@commons/api/chat/chat.api';
import { Chat as ChatType } from '@commons/api/chat/chat.types';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import WebSocketClient from '@commons/websocket/websocketClient';
import { useNavigation, useRoute } from '@react-navigation/native';
import ConfirmExitModal from '@screens/Chat/modals/ConfimExit/ConfirmExitModal';
import React, { useEffect, useState } from 'react';
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
  const memberID = memberInfo.id;

  useHeaderControl({
    title: '채팅',
    left: false,
  });

  useEffect(() => {
    const ws = WebSocketClient;
    ws.connect(memberID, ''); // 'roomID'는 구독에 필요하지 않으므로 빈 문자열로 처리
    ws.subscribeToChat(memberID); // 특정 사용자 채팅 구독

    return () => {
      ws.disconnect(); // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    };
  }, [memberID]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetchChatList();
        console.log('Fetch response:', JSON.stringify(response));

        if (response.isSuccess && response.result.length === 0) {
          setChats([]);
          setError('아직 진행 중인 대화가 없어요.\n엽서를 보내 대화를 시작해보세요.');
        } else if (response.isSuccess && Array.isArray(response.result)) {
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
            // unreadCount: chatRoom.unreadCount, 만약 chatRoom.lastChat 이 없으면 엽서를 보낸 상태이므로 +1
            unreadCount: chatRoom.lastChat ? chatRoom.unreadCount : chatRoom.unreadCount + 1,
            partner: chatRoom.otherMember,
            postcard: chatRoom.postcard,
            isAlert: chatRoom.isAlert, // isAlert 추가
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

  // 네비게이션 파라미터를 통해 채팅방 나가기 상태를 확인하고 로컬 상태를 업데이트합니다.
  useEffect(() => {
    const exitedChatRoomId = route.params?.exitedChatRoomId;

    if (exitedChatRoomId) {
      // 채팅 목록에서 해당 채팅방을 제거합니다.
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== exitedChatRoomId));
      // 네비게이션 파라미터를 초기화하여 다시 실행되지 않도록 합니다.
      navigation.setParams({ exitedChatRoomId: null });
    }
  }, [route.params?.exitedChatRoomId]);

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

  // 알림 상태 변경 함수
  const handleSwitchAlert = () => {
    if (selectedChat) {
      const newAlertStatus = !selectedChat.isAlert;
      switchAlert(selectedChat.id, newAlertStatus);
      // selectedChat 상태 업데이트
      setSelectedChat({ ...selectedChat, isAlert: newAlertStatus });
      // chats 상태에서도 해당 채팅의 isAlert 값을 업데이트
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
                chatRoomID: item.id,
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

  if (error) {
    return (
      <S.EmptyWrapper>
        <Image
          source={require('@assets/images/icons/Warning03.png')}
          style={{ width: 51, height: 51, marginBottom: 20 }}
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

      {/* 나가기 확인 모달 */}
      <ConfirmExitModal
        isVisible={isExitConfirmVisible}
        onCancel={() => setIsExitConfirmVisible(false)}
        onExit={handleExitChat}
      />
    </>
  );
};

export default ChatScreen;
