// @screens/Chat/ChatDetail.tsx

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage } from '@commons/api/chat/chat.types';
import { postPostcardStatusUpdate } from '@commons/api/matching/matching.api';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import WebSocketClient from '@commons/websocket/websocketClient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatRequestModal from '@screens/Chat/modals/ChatRequest/ChatRequestModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import { EPostcardStatus } from '@screens/Matching/Postcard/Send/SendPostcard.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Clipboard,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Message extends ChatMessage {
  status?: 'SUCCESS' | 'FAIL' | 'PENDING';
}

const ChatDetail: React.FC = () => {
  const { movePage } = useMovePage();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { partner, postcard, chatRoomID, isAlert } = params as any;

  console.log(`
    ====================
    Smock Type: ${partner.smokeType}
    =================
    `);

  const smokType =
    partner.smokeType === 'NON_SMOKE' ? '🚭비흡연자' : partner.smokeType === 'SOMETIMES' ? '🚬가끔 펴요' : '🚬흡연자';

  // 상태들
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [inputHasValue, setInputHasValue] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isReportSubmittedModalVisible, setIsReportSubmittedModalVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isCopyModalVisible, setCopyModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [patnerIsConnected, setPartnerIsConnected] = useState(false);
  const messageRefs = useRef<{ [key: string]: View | null }>({});
  const [isResendModalVisible, setIsResendModalVisible] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const reportBottomSheetRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const userId = parseInt(memberInfo?.id);

  const insets = useSafeAreaInsets(); // 안전 영역 인셋

  const parseDate = (dateString: string | undefined) => {
    if (!dateString) {
      return new Date(0);
    }
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;
  };

  // 새 메시지 처리
  const handleNewMessage = useCallback(
    (newMessage: any) => {
      console.log(`
        ====================
        New Message Received
        newMessage: ${JSON.stringify(newMessage)}
        =================
      `);

      const newMessageData: Message = {
        ...newMessage,
        status: newMessage.status,
      };

      setMessages((prevMessages) => [newMessageData, ...prevMessages]);
      setDisplayedMessages((prevDisplayed) => [newMessageData, ...prevDisplayed]);

      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    },
    [chatRoomID],
  );

  // 메시지 재전송 모달 닫기
  const closeResendModal = () => {
    setIsResendModalVisible(false);
    setSelectedMessage(null);
  };

  // 메시지 재전송 요청
  const handleResendMessage = (message: Message, index: number) => {
    setSelectedMessage(message);
    setSelectedMessageIndex(index);
    setIsResendModalVisible(true);
  };

  // 메시지 재전송
  const handleResend = async () => {
    if (selectedMessageIndex === null || !selectedMessage) return;

    console.log(`
      ====================
      Resending Message
      selectedMessage: ${JSON.stringify(selectedMessage)}
      selectedMessageIndex: ${selectedMessageIndex}
      =================
    `);

    try {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.splice(selectedMessageIndex, 1);
        return newMessages;
      });

      setDisplayedMessages((prevDisplayed) => {
        const newDisplayed = [...prevDisplayed];
        newDisplayed.splice(selectedMessageIndex, 1);
        return newDisplayed;
      });

      WebSocketClient.sendChatMessage(
        chatRoomID,
        userId.toString(),
        {
          text: selectedMessage.content,
          id: selectedMessage.id,
        },
        selectedMessage.id,
      );

      showToast({ content: '메시지를 다시 보냈습니다.' });
    } catch (error) {
      setMessages((prevMessages) => [selectedMessage, ...prevMessages]);
      setDisplayedMessages((prevDisplayed) => [selectedMessage, ...prevDisplayed]);

      console.error('메시지 재전송 중 오류 발생:', error);
      showToast({ content: '메시지 재전송에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      closeResendModal();
    }
  };

  // 메시지 삭제
  const handleDelete = () => {
    if (selectedMessageIndex === null || !selectedMessage) return;

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.splice(selectedMessageIndex, 1);
      return newMessages;
    });

    setDisplayedMessages((prevDisplayed) => {
      const newDisplayed = [...prevDisplayed];
      newDisplayed.splice(selectedMessageIndex, 1);
      return newDisplayed;
    });

    showToast({ content: '메시지를 삭제했습니다.' });
    closeResendModal();
  };

  // WebSocket 연결 상태 처리
  const handleConnectionStatus = (statusMessage: any) => {
    if (statusMessage.status === 'CONNECTED') {
      setPartnerIsConnected(true);
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({
          ...msg,
          isRead: true,
        })),
      );
      setDisplayedMessages((prevDisplayed) =>
        prevDisplayed.map((msg) => ({
          ...msg,
          isRead: true,
        })),
      );
    } else if (statusMessage.status === 'DISCONNECTED') {
      setPartnerIsConnected(false);
    }
  };

  useEffect(() => {
    setDisplayedMessages([...messages]);
  }, [messages]);

  // 채팅 메시지 불러오기
  const loadChatMessages = useCallback(async () => {
    try {
      setPage((prevPage) => prevPage + 1);
      const response = await fetchChatMessages(chatRoomID, page, 100);
      let fetchedMessages: ChatMessage[] = [];

      if (response.isSuccess && response.result.content.length > 0) {
        fetchedMessages = response.result.content;
      }

      const postcardWithId = { ...postcard, isPostcard: true, id: 'postcard' };
      const combinedMessages = [postcardWithId, ...fetchedMessages];

      combinedMessages.sort((a, b) => {
        const dateA = parseDate(a.timestamp || a.createdAt);
        const dateB = parseDate(b.timestamp || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      const postcardIndex = combinedMessages.findIndex((item) => item.id === 'postcard');
      const postcardItem = combinedMessages.splice(postcardIndex, 1);
      combinedMessages.push(postcardItem[0]);

      const messagesWithStatus = combinedMessages.map((msg) => ({
        ...msg,
        status: msg.senderId === userId ? 'SUCCESS' : 'PENDING',
      }));

      setMessages(messagesWithStatus);
      setDisplayedMessages(messagesWithStatus.slice(0, 100));
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      const postcardWithId = { ...postcard, isPostcard: true, id: 'postcard', status: 'SUCCESS' };
      const combinedMessages = [postcardWithId];
      setMessages(combinedMessages);
      setDisplayedMessages(combinedMessages);
      showToast({ content: '메시지 로드에 실패했습니다. 다시 시도해주세요.' });
    }
  }, [chatRoomID, showToast, postcard, userId]);

  useEffect(() => {
    setIsModalVisible(true);
    loadChatMessages();

    WebSocketClient.subscribe(handleNewMessage, `/topic/chat/${userId.toString()}`);
    WebSocketClient.subscribe(handleConnectionStatus, `/topic/chat/room/${chatRoomID}/${userId.toString()}`);
    WebSocketClient.publishConnectionStatus(chatRoomID, userId.toString(), true);

    WebSocketClient.onSendMessageStatus((messageId: string, status: 'SUCCESS' | 'FAIL') => {
      setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)));
      setDisplayedMessages((prevDisplayed) =>
        prevDisplayed.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)),
      );
      if (status === 'FAIL') {
        showToast({ content: '메시지 전송에 실패했습니다. 다시 시도해주세요.' });
      }
    });

    return () => {
      WebSocketClient.publishConnectionStatus(chatRoomID, userId.toString(), false);
      WebSocketClient.unsubscribe(`/topic/chat/room/${chatRoomID}/${userId.toString()}` as string);
    };
  }, [loadChatMessages, postcard.status, userId, chatRoomID, handleNewMessage, showToast]);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setShowScrollButton(value > 3000);
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  // 엽서 수락
  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
  };

  // 엽서 거절
  const handleDecline = async () => {
    try {
      await postPostcardStatusUpdate({ postcardId: postcard.postcardId, status: EPostcardStatus.REFUSED });

      showToast({ content: '엽서를 거절했습니다.' });
      navigation.navigate('chat');
    } catch (error) {
      console.error('엽서 거절 중 오류 발생:', error);
      showToast({ content: '엽서를 거절하는 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsDeclineModalVisible(false);
    }
  };

  // 신고 처리
  const handleReport = () => {
    setIsModalVisible(false); // ChatRequestModal 닫기
    reportBottomSheetRef.current?.present(); // 신고 모달 열기
  };

  // 엽서 거절 모달 닫기
  const closeDeclineModal = () => {
    setIsDeclineModalVisible(false);
    setIsModalVisible(true);
  };

  // 신고 접수 모달 닫기
  const closeReportSubmittedModal = () => {
    setIsReportSubmittedModalVisible(false);
    navigation.goBack();
  };

  // 메시지 더 불러오기
  const loadMoreMessages = async () => {
    if (loadingMore || displayedMessages.length >= messages.length) return;

    setLoadingMore(true);

    try {
      const response = await fetchChatMessages(chatRoomID, page + 1, 100); // 다음 페이지 요청
      if (response.isSuccess && response.result.content.length > 0) {
        const newMessages: ChatMessage[] = response.result.content;

        const updatedMessages = [...messages, ...newMessages];
        updatedMessages.sort(
          (a, b) => parseDate(b.timestamp || b.createdAt).getTime() - parseDate(a.timestamp || a.createdAt).getTime(),
        );

        setMessages(updatedMessages);
        setDisplayedMessages((prevDisplayed) => [...prevDisplayed, ...newMessages]);

        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('추가 메시지를 불러오는 중 오류가 발생했습니다:', error);
      showToast({ content: '추가 메시지를 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setLoadingMore(false);
    }
  };

  // 메시지 길게 누르기
  const handleLongPress = (event: any, message: Message, index: number) => {
    const messageKey = `${message.senderId}-${message.sendTime}-${index}`;
    const messageRef = messageRefs.current[messageKey];

    if (messageRef) {
      messageRef.measure((fx, fy, width, height, px, py) => {
        const modalWidth = 140;
        const modalHeight = 50;

        const targetX = px;
        const targetY = py;

        const topPositionAbove = targetY - modalHeight - 10;
        const topPositionBelow = targetY + height + 10;

        const leftPositionLeft = targetX;
        const leftPositionRight = targetX + width - modalWidth;

        const isTopHalf = targetY < SCREEN_HEIGHT / 2;

        setModalPosition({
          top: isTopHalf ? topPositionBelow : topPositionAbove,
          left: targetX + modalWidth > SCREEN_WIDTH ? leftPositionRight : leftPositionLeft,
        });

        setSelectedMessage(message);
        setSelectedMessageIndex(index);
        setCopyModalVisible(true);
      });
    }
  };

  // 메시지 복사하기
  const handleCopy = () => {
    if (selectedMessage) {
      Clipboard.setString(selectedMessage.content || selectedMessage.text || '');
      showToast({ content: '메시지가 복사되었습니다.' });
      setCopyModalVisible(false);
    }
  };

  // 복사 모달 닫기
  const closeModal = () => {
    setCopyModalVisible(false);
    setSelectedMessage(null);
  };

  // 메시지 보내기
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageId = `temp-${Date.now()}`;
    const message = {
      text: inputMessage.trim(),
      id: messageId,
      sendTime: new Date().toISOString(),
    };

    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

    setInputMessage('');
    setInputHasValue(false);

    if (!WebSocketClient.isConnected) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          status: 'FAIL',
        },
      ]);
      setDisplayedMessages((prevDisplayed) => [
        ...prevDisplayed,
        {
          ...message,
          status: 'FAIL',
        },
      ]);
      showToast({ content: '메시지 전송에 실패했습니다. 인터넷 연결을 확인해주세요.' });
      return;
    }

    WebSocketClient.sendChatMessage(chatRoomID, userId.toString(), message, messageId);
  };

  // 메시지 렌더링
  const renderMessageItem = ({ item, index }: { item: Message; index: number }) => {
    const isPostcardItem = item.isPostcard;
    const isUserMessage = (isPostcardItem && item.senderId === userId) || item.senderId === userId;

    const messageKey = `${item.senderId}-${item.sendTime}-${index}`;
    const isRead = item.isRead;

    const currentItemDate = parseDate(item.sendTime || item.createdAt).toDateString();
    const nextItemDate =
      index < displayedMessages.length - 1
        ? parseDate(displayedMessages[index + 1].sendTime || displayedMessages[index + 1].createdAt).toDateString()
        : null;

    const showDateSeparator = index === displayedMessages.length - 1 || currentItemDate !== nextItemDate;

    const formattedTime = parseDate(item.sendTime || item.createdAt).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    });

    if (isPostcardItem) {
      return (
        <S.MessageItem>
          {showDateSeparator && (
            <S.DateSeparator>
              <S.DateText>
                {parseDate(item.sendTime || item.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </S.DateText>
            </S.DateSeparator>
          )}
          <S.MessageItemInner isUserMessage={isUserMessage}>
            {!isUserMessage && <S.MessageAvatar source={{ uri: partner.profileImageUrl }} />}
            <S.MessageContent isUserMessage={isUserMessage}>
              {!isUserMessage && <S.MessageUsername>{partner.name}</S.MessageUsername>}
              <S.MessageRow isUserMessage={isUserMessage}>
                {isUserMessage && (
                  <S.isReadIcon
                    source={
                      patnerIsConnected || (isRead && item.status)
                        ? require('@assets/images/icons/ReadMessage.png')
                        : require('@assets/images/icons/UnreadMessage.png')
                    }
                  />
                )}
                <S.BookChatBubble isUserMessage={isUserMessage}>
                  {item?.imageUrl && (
                    <S.BookCover
                      source={{ uri: item.imageUrl }}
                      onError={(error) => console.error('Image load error:', error.nativeEvent.error)}
                    />
                  )}
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                    {isUserMessage && <S.Timestamp isUserMessage={isUserMessage}>{formattedTime}</S.Timestamp>}
                    <TouchableOpacity
                      ref={(ref) => {
                        if (ref) messageRefs.current[messageKey] = ref;
                      }}
                      onLongPress={(event) => handleLongPress(event, item, index)}
                    >
                      <S.MessageBubble isUserMessage={isUserMessage}>
                        <S.MessageText isUserMessage={isUserMessage}>{item?.message}</S.MessageText>
                      </S.MessageBubble>
                    </TouchableOpacity>
                    {!isUserMessage && <S.Timestamp isUserMessage={isUserMessage}>{formattedTime}</S.Timestamp>}
                  </View>
                </S.BookChatBubble>
              </S.MessageRow>
            </S.MessageContent>
          </S.MessageItemInner>
        </S.MessageItem>
      );
    }

    return (
      <S.MessageItem>
        {showDateSeparator && (
          <S.DateSeparator>
            <S.DateText>
              {parseDate(item.sendTime || item.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </S.DateText>
          </S.DateSeparator>
        )}
        <S.MessageItemInner isUserMessage={isUserMessage}>
          {!isUserMessage && <S.MessageAvatar source={{ uri: partner.profileImageUrl }} />}
          <S.MessageContent isUserMessage={isUserMessage}>
            {!isUserMessage && <S.MessageUsername>{partner.name}</S.MessageUsername>}
            <S.MessageRow isUserMessage={isUserMessage}>
              {isUserMessage && item.status === 'SUCCESS' && (
                <S.isReadIcon
                  source={
                    patnerIsConnected || isRead
                      ? require('@assets/images/icons/ReadMessage.png')
                      : require('@assets/images/icons/UnreadMessage.png')
                  }
                />
              )}
              {isUserMessage && item.status === 'FAIL' && (
                <>
                  <TouchableOpacity onPress={() => handleResendMessage(item, index)}>
                    <S.ErrorIcon
                      source={require('@assets/images/icons/message_error.png')}
                      style={{ width: 16, height: 16 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleResendMessage(item, index)}>
                    {/* <Text style={{ marginLeft: 5 }}>전송 안 됨</Text> ===> 모든 글자가 출력안됨*/}
                    <S.ErrorText>전송 안 됨</S.ErrorText>
                  </TouchableOpacity>
                </>
              )}
              {isUserMessage && item.status !== 'FAIL' && (
                <S.Timestamp isUserMessage={isUserMessage}>{formattedTime}</S.Timestamp>
              )}
              <TouchableOpacity
                ref={(ref) => {
                  if (ref) messageRefs.current[messageKey] = ref;
                }}
                onPress={() => {
                  if (item.status === 'FAIL') {
                    handleResendMessage(item, index);
                  }
                }}
                onLongPress={(event) => handleLongPress(event, item, index)}
              >
                <S.MessageBubble isUserMessage={isUserMessage} sendStatus={item.status}>
                  <S.MessageText isUserMessage={isUserMessage}>{item.content || item.text}</S.MessageText>
                </S.MessageBubble>
              </TouchableOpacity>
              {!isUserMessage && <S.Timestamp isUserMessage={isUserMessage}>{formattedTime}</S.Timestamp>}
            </S.MessageRow>
          </S.MessageContent>
        </S.MessageItemInner>
      </S.MessageItem>
    );
  };

  // 스크롤 아래로
  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top} // 안전 영역을 고려한 오프셋 추가
      >
        <S.Wrapper>
          <S.Header>
            <S.BackButton onPress={() => navigation.goBack()}>
              {/* 이미지 */}
              <S.BackButtonIcon source={require('@assets/images/icons/BackButton.png')} />
            </S.BackButton>
            <S.HeaderTitle>
              <S.SmallAvatar source={{ uri: partner.profileImageUrl }} />
              <S.HeaderText>{partner.name}</S.HeaderText>
            </S.HeaderTitle>
            <InfoButton
              onPress={() => navigation.navigate('ChatInfoScreen', { partner, handleReport, chatRoomID, isAlert })}
            />
          </S.Header>

          <S.Body>
            <FlatList
              ref={flatListRef}
              data={displayedMessages}
              renderItem={renderMessageItem}
              keyExtractor={(item, index) => item.id || `postcard-${index}`}
              ListFooterComponent={<View style={{ height: 20 }} />} // 스크롤의 부드러운 상단 위치를 위한 여유 공간 추가
              onEndReached={loadMoreMessages}
              onEndReachedThreshold={0.5}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              inverted // 리스트를 inverted로 유지
              removeClippedSubviews
              contentContainerStyle={{
                flexGrow: 1, // 메시지가 적을 때 상단에 고정
                justifyContent: 'flex-end',
              }}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: false,
              })}
              scrollEventThrottle={16}
              ListFooterComponent={
                <>
                  <S.ProfileSection>
                    <S.ProfileAvatar source={{ uri: partner.profileImageUrl }} />
                    <S.ProfileInfo>
                      <S.ProfileName>{partner.name}</S.ProfileName>
                      <S.ProfileSchool>{partner.schoolName}</S.ProfileSchool>
                      <S.ProfileDetails>{`${smokType} • ${partner.mbti} • ${partner.height}cm`}</S.ProfileDetails>
                      <S.LibraryButton
                        onPress={movePage('library', {
                          memberId: partner.id,
                          isYourLibrary: true,
                        })}
                      >
                        <S.LibraryButtonText>서재 구경하기</S.LibraryButtonText>
                      </S.LibraryButton>
                    </S.ProfileInfo>
                  </S.ProfileSection>
                </>
              }
            />
          </S.Body>

          {showScrollButton && (
            <S.ScrollToBottomButton onPress={scrollToBottom}>
              <Icon name="chevron-down" size={24} color="#1D2E61" />
            </S.ScrollToBottomButton>
          )}

          <S.InputContainer>
            <TextInput
              value={inputMessage}
              onChangeText={(text) => {
                setInputMessage(text);
                setInputHasValue(text.trim().length > 0);
              }}
              placeholder="메시지 보내기"
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: '#ecedef',
                borderRadius: 20,
              }}
            />
            <S.SendButton onPress={handleSendMessage} style={{ opacity: inputHasValue ? 1 : 0.5 }}>
              <S.SendButtonIcon source={require('@assets/images/icons/SendMessage.png')} />
            </S.SendButton>
          </S.InputContainer>

          {/* ChatRequestModal을 상태에 따라 렌더링 */}
          {isModalVisible && (
            <ChatRequestModal
              visible={isModalVisible}
              onAccept={handleAccept}
              onDecline={() => {
                setIsModalVisible(false);
                setIsDeclineModalVisible(true);
              }}
              onReport={handleReport}
              postcard={postcard}
              partner={partner}
            />
          )}

          {/* 신고 모달 */}
          <CustomBottomSheetModal ref={reportBottomSheetRef} index={0} snapPoints={['78%']}>
            <ReportOption
              bottomClose={() => reportBottomSheetRef.current?.close()}
              reportedMemberId={partner.memberId}
              onClose={() => {
                if (postcard.status === 'PENDING') {
                  setIsModalVisible(true);
                }
              }}
              onReport={() => {
                handleDecline();
              }}
            />
          </CustomBottomSheetModal>

          {/* 신고 접수 모달 */}
          <Modal visible={isReportSubmittedModalVisible} transparent animationType="fade">
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <View style={{ width: 320, padding: 20, backgroundColor: 'white', borderRadius: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                  신고가 접수되었습니다
                </Text>
                <Text style={{ marginBottom: 20, color: '#555', textAlign: 'center' }}>
                  최대 24시간 이내에 검토가 완료됩니다
                </Text>
                <TouchableOpacity
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 46,
                    backgroundColor: '#1D2E61',
                    borderRadius: 20,
                    alignItems: 'center',
                  }}
                  onPress={closeReportSubmittedModal}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* 엽서 거절 모달 */}
          <Modal visible={isDeclineModalVisible} transparent animationType="fade">
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <S.DeclineModal>
                <S.ModalTitle>엽서를 거절하시겠어요?</S.ModalTitle>
                <S.ModalDescription>
                  엽서를 거절하면 받은 엽서 목록에서 사라집니다.
                  {'\n'}
                  엽서를 다시 확인해보세요.
                </S.ModalDescription>
                <S.ModalButtonContainer>
                  <S.DeclineButton onPress={handleDecline}>
                    <S.DeclineButtonText>거절하기</S.DeclineButtonText>
                  </S.DeclineButton>
                  <S.ReviewButton onPress={closeDeclineModal}>
                    <S.ReviewButtonText>다시 보기</S.ReviewButtonText>
                  </S.ReviewButton>
                </S.ModalButtonContainer>
              </S.DeclineModal>
            </View>
          </Modal>

          {/* 메시지 복사 모달 */}
          <Modal transparent visible={isCopyModalVisible} onRequestClose={closeModal} animationType="fade">
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    position: 'absolute',
                    top: modalPosition.top,
                    left: modalPosition.left,
                    backgroundColor: '#FFFFFF',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 140,
                    }}
                    onPress={handleCopy}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>복사하기</Text>
                    <Ionicons name="copy-outline" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* 메시지 재전송 모달 */}
          <Modal visible={isResendModalVisible} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <TouchableOpacity onPress={handleResend}>
                  <Text style={{ paddingVertical: 20 }}>다시 보내기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <Text style={{ paddingVertical: 20, color: 'red' }}>삭제하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </S.Wrapper>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDetail;
