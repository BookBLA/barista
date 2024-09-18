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

// 더미 데이터 정의
const dummyChats: ChatType[] = [
  {
    id: '1',
    name: '홍길동',
    avatar: { uri: 'https://placekitten.com/200/200' }, // 임의의 이미지 URL
    lastMessage: '안녕하세요! 오늘 저녁에 만날까요?',
    timestamp: '오전 5:11',
    unreadCount: 2,
    partner: {
      id: 'user1',
      name: '홍길동',
      profileImageUrl: 'https://placekitten.com/200/200',
      // 기타 필요한 필드 추가
    },
    postcard: {
      id: 'post1',
      message: '엽서를 받았어요!',
      createdAt: '2024-09-17T20:11:05.094Z',
      // 기타 필요한 필드 추가
    },
    isAlert: true,
  },
  {
    id: '2',
    name: '김철수',
    avatar: { uri: 'https://placekitten.com/201/201' },
    lastMessage: '프로젝트 관련해서 미팅이 필요해요.',
    timestamp: '오전 5:11',
    unreadCount: 0,
    partner: {
      id: 'user2',
      name: '김철수',
      profileImageUrl: 'https://placekitten.com/201/201',
      // 기타 필요한 필드 추가
    },
    postcard: {
      id: 'post2',
      message: '엽서를 보내주셔서 감사합니다!',
      createdAt: '2024-09-17T20:11:05.095Z',
      // 기타 필요한 필드 추가
    },
    isAlert: false,
  },
  {
    id: '3',
    name: '이영희',
    avatar: { uri: 'https://placekitten.com/202/202' },
    lastMessage: '이번 주말에 여행 갈래요?',
    timestamp: '오전 5:11',
    unreadCount: 5,
    partner: {
      id: 'user3',
      name: '이영희',
      profileImageUrl: 'https://placekitten.com/202/202',
      // 기타 필요한 필드 추가
    },
    postcard: {
      id: 'post3',
      message: '엽서를 잘 받았어요!',
      createdAt: '2024-09-17T20:11:05.095Z',
      // 기타 필요한 필드 추가
    },
    isAlert: true,
  },
];

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

  // 채팅 목록 로드 함수
  const loadChats = useCallback(async () => {
    try {
      const response = await fetchChatList();

      if (response.isSuccess) {
        if (response.result.length === 0) {
          console.log(`
            ==============================
            dummyChats: ${JSON.stringify(dummyChats)}
            ==============================
          `);

          // 서버에 데이터가 없을 경우 더미 데이터 설정
          setChats(dummyChats);
          setError(''); // 에러 상태 초기화
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

          setChats(formattedChats);
          setError(''); // 에러 상태 초기화
        }
      } else {
        // 서버 응답이 실패한 경우 더미 데이터 설정
        setChats(dummyChats);
        setError('더미 데이터를 표시하고 있습니다.\n채팅 목록을 불러올 수 없습니다.');
      }
    } catch (err) {
      // 오류 발생 시 더미 데이터 설정
      setChats(dummyChats);
      setError('더미 데이터를 표시하고 있습니다.\n채팅 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Failed to fetch chat list:', err);
    }
  }, []);

  // 페이지가 포커스될 때마다 채팅 목록 로드
  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [loadChats]),
  );

  useEffect(() => {
    const ws = WebSocketClient;

    // WebSocket 연결 시도
    ws.connect(memberID, memberID);

    // WebSocket 연결이 완료된 후에 구독이 설정되도록 수정됨
    const handleStompConnect = () => {
      if (ws.isConnected && ws.stompConnected) {
        ws.subscribe(memberID, memberID, handleNewMessage, `/topic/chat/${memberID}`);
      }
    };

    ws.onConnect = handleStompConnect; // 연결 후에 구독 설정

    // 페이지에서 나갈 때 구독 해제 및 연결 해제
    return () => {
      // ws.unsubscribe(`/topic/chat/${memberID}`);
      // ws.disconnect();
    };
  }, [memberID]);

  // WebSocket에서 새로운 메시지가 들어올 때 채팅 목록을 다시 로드
  const handleNewMessage = useCallback(() => {
    loadChats();
  }, [loadChats]);

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
        <View style={{ alignItems: 'center', padding: 10 }}>
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

      <ConfirmExitModal
        isVisible={isExitConfirmVisible}
        onCancel={() => setIsExitConfirmVisible(false)}
        onExit={handleExitChat}
      />
    </>
  );
};

export default ChatScreen;
