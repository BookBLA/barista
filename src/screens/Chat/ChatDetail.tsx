// @screens/Chat/ChatDetail.tsx

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage } from '@commons/api/chat/chat.types';
import { postPostcardStatusUpdate } from '@commons/api/matching/matching.api'; // 엽서 상태 업데이트 API import
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import WebSocketClient from '@commons/websocket/websocketClient'; // Updated WebSocketClient import
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
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);

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
  const [inputFocused, setInputFocused] = useState(false);
  const [patnerIsConnected, setPartnerIsConnected] = useState(false);
  const messageRefs = useRef<{ [key: string]: View | null }>({});
  const [isResendModalVisible, setIsResendModalVisible] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const reportBottomSheetRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);
  const memberInfo = useMemberStore((state) => state.memberInfo);
  const userId = parseInt(memberInfo?.id);

  const parseDate = (dateString: string | undefined) => {
    if (!dateString) {
      return new Date(0);
    }
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;
  };

  const handleNewMessage = useCallback(
    (newMessage: any) => {
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

  const closeResendModal = () => {
    setIsResendModalVisible(false);
    setSelectedMessage(null);
  };

  const handleResendMessage = (message: Message, index: number) => {
    setSelectedMessage(message);
    setSelectedMessageIndex(index);
    setIsResendModalVisible(true);
  };

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
      // Remove the selected message by index from messages
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.splice(selectedMessageIndex, 1);
        return newMessages;
      });

      // Similarly, remove the selected message from displayedMessages
      setDisplayedMessages((prevDisplayed) => {
        const newDisplayed = [...prevDisplayed];
        newDisplayed.splice(selectedMessageIndex, 1);
        return newDisplayed;
      });

      // Resend the message via WebSocket
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
      // If resending fails, re-add the message to the arrays
      setMessages((prevMessages) => [selectedMessage, ...prevMessages]);
      setDisplayedMessages((prevDisplayed) => [selectedMessage, ...prevDisplayed]);

      console.error('메시지 재전송 중 오류 발생:', error);
      showToast({ content: '메시지 재전송에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      closeResendModal();
    }
  };

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

  const handleConnectionStatus = (statusMessage: any) => {
    if (statusMessage.status === 'CONNECTED') {
      // 앞으로 상대방이 나가기 전까지 모든 메시지를 읽음 처리
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

  const loadChatMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(chatRoomID, 0, 100);
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
    setIsModalVisible(postcard.status === 'PENDING');
    loadChatMessages();

    WebSocketClient.connect(userId.toString(), chatRoomID.toString());
    WebSocketClient.subscribe(chatRoomID, userId.toString(), handleNewMessage, `/topic/chat/${userId.toString()}`);
    WebSocketClient.subscribe(
      chatRoomID,
      userId.toString(),
      handleConnectionStatus,
      `/topic/chat/room/${chatRoomID}/${userId.toString()}`,
    );
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
      WebSocketClient.unsubscribe(`/topic/chat/${userId.toString()}` as string);
      WebSocketClient.unsubscribe(`/topic/chat/room/${chatRoomID}/${userId.toString()}` as string);
    };
  }, [loadChatMessages, postcard.status, userId, chatRoomID, handleNewMessage, showToast]);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setShowScrollButton(value > 3000);
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
  };

  const handleDecline = async () => {
    try {
      await postPostcardStatusUpdate({ postcardId: postcard.postcardId, status: EPostcardStatus.REFUSED });

      showToast({ content: '엽서를 거절했습니다.' });
      navigation.goBack();
    } catch (error) {
      console.error('엽서 거절 중 오류 발생:', error);
      showToast({ content: '엽서를 거절하는 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsDeclineModalVisible(false);
    }
  };

  const handleReport = () => {
    reportBottomSheetRef.current?.present();
  };

  const closeDeclineModal = () => {
    setIsDeclineModalVisible(false);
    setIsModalVisible(true);
  };

  const closeReportSubmittedModal = () => {
    setIsReportSubmittedModalVisible(false);
    navigation.goBack();
  };

  const loadMoreMessages = () => {
    if (loadingMore || displayedMessages.length >= messages.length) return;
    setLoadingMore(true);
    const currentLength = displayedMessages.length;
    const additionalMessages = messages.slice(currentLength, currentLength + 100);
    setDisplayedMessages((prev) => [...prev, ...additionalMessages]);

    const postcardIndex = additionalMessages.findIndex((item) => item.id === 'postcard');
    if (postcardIndex !== -1) {
      const postcardItem = additionalMessages.splice(postcardIndex, 1);
      setDisplayedMessages((prev) => [postcardItem[0], ...prev]);
    }

    setLoadingMore(false);
  };

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
        setSelectedMessageIndex(index); // Set the selected message index
        setCopyModalVisible(true);
      });
    }
  };

  const handleCopy = () => {
    if (selectedMessage) {
      Clipboard.setString(selectedMessage.content || selectedMessage.text || '');
      showToast({ content: '메시지가 복사되었습니다.' });
      setCopyModalVisible(false);
    }
  };

  const closeModal = () => {
    setCopyModalVisible(false);
    setSelectedMessage(null);
  };

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

    // 만약 네트워크 연결 안되어 있으면 실패 상태로 설정
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
                {parseDate(item.createdAt).toLocaleDateString('ko-KR', {
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
                <TouchableOpacity onPress={() => handleResendMessage(item, index)}>
                  <S.ErrorIcon source={require('@assets/images/icons/message_error.png')} />
                </TouchableOpacity>
              )}
              {isUserMessage && item.status === 'FAIL' && (
                <TouchableOpacity onPress={() => handleResendMessage(item, index)}>
                  <Text style={{ color: 'red', marginLeft: 5 }}>전송안됨</Text>
                </TouchableOpacity>
              )}
              {isUserMessage && item.status !== 'FAIL' && (
                <S.Timestamp isUserMessage={isUserMessage}>{formattedTime}</S.Timestamp>
              )}
              <TouchableOpacity
                ref={(ref) => {
                  if (ref) messageRefs.current[messageKey] = ref;
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

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={15}
      >
        <S.Wrapper>
          <S.Header>
            <S.BackButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </S.BackButton>
            <S.HeaderTitle>
              <S.SmallAvatar source={{ uri: partner.profileImageUrl }} />
              <S.HeaderText>{partner.name}</S.HeaderText>
            </S.HeaderTitle>
            <InfoButton
              onPress={() => navigation.navigate('ChatInfoScreen', { partner, handleReport, chatRoomID, isAlert })}
            />
          </S.Header>

          <FlatList
            ref={flatListRef}
            data={displayedMessages}
            renderItem={renderMessageItem}
            keyExtractor={(item, index) => item.id || `postcard-${index}`}
            contentContainerStyle={{ paddingVertical: 10 }}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.5}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            inverted
            removeClippedSubviews
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}
            ListFooterComponent={
              <>
                <S.ProfileSection>
                  <S.ProfileAvatar source={{ uri: partner.profileImageUrl }} />
                  <S.ProfileInfo>
                    <S.ProfileName>{partner.name}</S.ProfileName>
                    <S.ProfileSchool>{partner.schoolName}</S.ProfileSchool>
                    <S.ProfileDetails>{`${partner.smokeType} • ${partner.mbti} • ${partner.height}cm`}</S.ProfileDetails>
                    <S.LibraryButton
                      onPress={() =>
                        navigation.navigate('Library', { memberId: partner.memberId, isYourLibrary: true })
                      }
                    >
                      <S.LibraryButtonText>서재 구경하기</S.LibraryButtonText>
                    </S.LibraryButton>
                  </S.ProfileInfo>
                </S.ProfileSection>
              </>
            }
          />

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
              style={{ flex: 1, padding: 10 }}
            />
            <S.SendButton onPress={handleSendMessage} style={{ opacity: inputHasValue ? 1 : 0.5 }}>
              <S.SendButtonIcon source={require('@assets/images/icons/SendMessage.png')} />
            </S.SendButton>
          </S.InputContainer>

          {isModalVisible && (
            <ChatRequestModal
              visible={isModalVisible}
              onAccept={handleAccept}
              onDecline={() => setIsDeclineModalVisible(true)}
              onReport={handleReport}
              postcard={postcard}
            />
          )}

          <CustomBottomSheetModal ref={reportBottomSheetRef} index={0} snapPoints={['78%']}>
            <ReportOption
              bottomClose={() => reportBottomSheetRef.current?.close()}
              reportedMemberId={partner.memberId}
            />
          </CustomBottomSheetModal>

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

          <Modal visible={isDeclineModalVisible} transparent animationType="fade">
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <S.DeclineModal>
                <S.ModalTitle>엽서를 거절하시겠어요?</S.ModalTitle>
                <S.ModalDescription>
                  엽서를 거절하면 받은 엽서 목록에서 사라집니다. 엽서를 다시 확인해보세요.
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
