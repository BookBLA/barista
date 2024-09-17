// @screends/Chat/ChatDetail.tsx

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage } from '@commons/api/chat/chat.types';
import { postPostcardStatusUpdate } from '@commons/api/matching/matching.api'; // 엽서 상태 업데이트 API import
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import WebSocketClient from '@commons/websocket/websocketClient'; // WebSocketClient 추가
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatRequestModal from '@screens/Chat/modals/ChatRequest/ChatRequestModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import { EPostcardStatus } from '@screens/Matching/Postcard/Send/SendPostcard.types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
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

const ChatDetail: React.FC = () => {
  const { movePage } = useMovePage();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { partner, postcard, chatRoomID, isAlert } = params as any;

  const [messages, setMessages] = useState<any[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState(''); // 메시지 입력 필드 상태 추가
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isReportSubmittedModalVisible, setIsReportSubmittedModalVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isCopyModalVisible, setCopyModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedMessage, setSelectedMessage] = useState('');
  const messageRefs = useRef<{ [key: string]: View | null }>({});
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const reportBottomSheetRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);
  const userId = useUserStore((state) => state.userInfo.id);

  // 날짜 파싱 함수 수정
  const parseDate = (dateString: string | undefined) => {
    if (!dateString) {
      return new Date(0); // 또는 원하는 기본 날짜를 설정
    }
    let parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(dateString.replace(' ', 'T'));
    }
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(dateString + 'Z');
    }
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(dateString.replace(' ', 'T') + 'Z');
    }
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date(0); // 파싱 실패 시 기본 날짜
    }
    return parsedDate;
  };

  const handleNewMessage = useCallback((message: any) => {
    // WebSocket을 통해 수신된 메시지를 상태에 추가
    setMessages((prevMessages) => [message, ...prevMessages]);
    setDisplayedMessages((prevMessages) => [message, ...prevMessages]);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true }); // 새로운 메시지 수신 시 스크롤 이동
  }, []);

  const loadChatMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(chatRoomID, 0, 100);
      let fetchedMessages: ChatMessage[] = [];

      console.log(`response : ${JSON.stringify(response)}`);

      // 메시지가 존재할 때만 fetchedMessages에 할당
      if (response.isSuccess && response.result.content.length > 0) {
        fetchedMessages = response.result.content;
      }

      // 엽서를 메시지 배열에 포함
      const postcardWithId = { ...postcard, isPostcard: true, id: 'postcard' }; // 엽서에 고유한 ID 설정
      const combinedMessages = fetchedMessages.length > 0 ? [...fetchedMessages, postcardWithId] : [postcardWithId];

      // 메시지와 엽서를 타임스탬프로 정렬
      combinedMessages.sort((a, b) => {
        const dateA = parseDate(a.timestamp || a.createdAt);
        const dateB = parseDate(b.timestamp || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setMessages(combinedMessages);
      setDisplayedMessages(combinedMessages.slice(0, 100));
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      const postcardWithId = { ...postcard, isPostcard: true, id: 'postcard' };
      const combinedMessages = [postcardWithId]; // 메시지가 없어도 엽서를 표시
      setMessages(combinedMessages);
      setDisplayedMessages(combinedMessages);
      showToast({ content: '메시지 로드에 실패했습니다. 다시 시도해주세요.' });
    }
  }, [chatRoomID, showToast, postcard]);

  useEffect(() => {
    // 엽서 상태에 따라 채팅 요청 모달 제어
    setIsModalVisible(postcard.status === 'PENDING');
    loadChatMessages();

    // WebSocket 연결 설정
    WebSocketClient.connect(userId, chatRoomID, handleNewMessage);

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      WebSocketClient.disconnect();
    };
  }, [loadChatMessages, postcard.status, userId, chatRoomID, handleNewMessage]);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setShowScrollButton(value > 3000);
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
    // TODO: 채팅 수락 API 호출 등 추가 작업 필요
  };

  // 엽서 거절 기능을 수행하는 함수
  const handleDecline = async () => {
    try {
      // 엽서 상태를 'REFUSED'로 업데이트하는 API 호출
      await postPostcardStatusUpdate({ postcardId: postcard.postcardId, status: EPostcardStatus.REFUSED });

      // 성공적으로 거절 시 사용자에게 알림
      showToast({ content: '엽서를 거절했습니다.' });
      navigation.goBack(); // 이전 화면으로 이동 또는 다른 적절한 처리
    } catch (error) {
      console.error('엽서 거절 중 오류 발생:', error);
      showToast({ content: '엽서를 거절하는 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsDeclineModalVisible(false); // 모달을 닫음
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
    setLoadingMore(false);
  };

  const handleLongPress = (event, message) => {
    const messageId = message.id || 'postcard'; // 엽서의 경우 'postcard' 사용
    const messageRef = messageRefs.current[messageId];

    if (messageRef) {
      messageRef.measure((fx, fy, width, height, px, py) => {
        const modalWidth = 140;
        const modalHeight = 50;

        const targetX = px;
        const targetY = py;
        const targetWidth = width;
        const targetHeight = height;

        const topPositionAbove = targetY - modalHeight - 10;
        const topPositionBelow = targetY + targetHeight + 10;

        const leftPositionLeft = targetX;
        const leftPositionRight = targetX + targetWidth - modalWidth;

        const isTopHalf = targetY < SCREEN_HEIGHT / 2;

        setModalPosition({
          top: isTopHalf ? topPositionBelow : topPositionAbove,
          left: targetX + modalWidth > SCREEN_WIDTH ? leftPositionRight : leftPositionLeft,
        });

        setSelectedMessage(message.text || message.message);
        setCopyModalVisible(true);
      });
    }
  };

  const handleCopy = () => {
    Clipboard.setString(selectedMessage);
    Alert.alert('복사 완료', '메시지가 복사되었습니다.');
    setCopyModalVisible(false);
  };

  const closeModal = () => {
    setCopyModalVisible(false);
  };

  // 메시지 전송 처리 함수
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return; // 빈 메시지 전송 방지

    const message = {
      chatRoomId: chatRoomID,
      sender: userId,
      text: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    WebSocketClient.sendChatMessage(`/app/chat/send/${chatRoomID}`, message); // WebSocket으로 메시지 전송
    setInputMessage(''); // 메시지 전송 후 입력 필드 초기화
  };

  const renderMessageItem = ({ item, index }: { item: any; index: number }) => {
    const isPostcardItem = item.isPostcard;
    const isUserMessage = item.sender === userId || (isPostcardItem && item.senderId === userId);

    // 서버에서 받은 읽음 상태를 사용
    const isRead = item.isRead; // 서버에서 전달된 읽음 상태 사용

    // 날짜 구분자 로직 수정
    const currentItemDate = parseDate(item.timestamp || item.createdAt).toDateString();
    const nextItemDate =
      index < displayedMessages.length - 1
        ? parseDate(displayedMessages[index + 1].timestamp || displayedMessages[index + 1].createdAt).toDateString()
        : null;

    const showDateSeparator = index === displayedMessages.length - 1 || currentItemDate !== nextItemDate;

    // 엽서 메시지 렌더링
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
                {/* 서버에서 전달된 읽음 상태 사용 */}
                {isUserMessage && (
                  <S.isReadIcon
                    source={
                      isRead
                        ? require('@assets/images/icons/ReadMessage.png')
                        : require('@assets/images/icons/UnreadMessage.png')
                    }
                  />
                )}
                {isUserMessage && (
                  <S.Timestamp isUserMessage={isUserMessage}>
                    {parseDate(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </S.Timestamp>
                )}
                <S.BookChatBubble isUserMessage={isUserMessage}>
                  {item.type?.imageUrl && (
                    <S.BookCover
                      source={{ uri: item.type.imageUrl }}
                      onError={(error) => console.error('Image load error:', error.nativeEvent.error)}
                    />
                  )}
                  <TouchableOpacity
                    ref={(ref) => {
                      if (ref) messageRefs.current['postcard'] = ref; // 엽서의 경우 'postcard' 키 사용
                    }}
                    onLongPress={(event) => handleLongPress(event, item)}
                  >
                    <S.MessageBubble isUserMessage={isUserMessage}>
                      <S.MessageText isUserMessage={isUserMessage}>{item.message}</S.MessageText>
                    </S.MessageBubble>
                  </TouchableOpacity>
                </S.BookChatBubble>
                {!isUserMessage && (
                  <S.Timestamp isUserMessage={isUserMessage}>
                    {parseDate(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </S.Timestamp>
                )}
              </S.MessageRow>
            </S.MessageContent>
          </S.MessageItemInner>
        </S.MessageItem>
      );
    }

    // 일반 메시지 렌더링
    return (
      <S.MessageItem>
        {showDateSeparator && (
          <S.DateSeparator>
            <S.DateText>
              {parseDate(item.timestamp).toLocaleDateString('ko-KR', {
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
                    isRead
                      ? require('@assets/images/icons/ReadMessage.png')
                      : require('@assets/images/icons/UnreadMessage.png')
                  }
                />
              )}
              {isUserMessage && (
                <S.Timestamp isUserMessage={isUserMessage}>
                  {parseDate(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.Timestamp>
              )}
              <TouchableOpacity
                ref={(ref) => {
                  if (ref) messageRefs.current[item.id] = ref;
                }}
                onLongPress={(event) => handleLongPress(event, item)}
              >
                <S.MessageBubble isUserMessage={isUserMessage}>
                  <S.MessageText isUserMessage={isUserMessage}>{item.content}</S.MessageText>
                </S.MessageBubble>
              </TouchableOpacity>
              {!isUserMessage && (
                <S.Timestamp isUserMessage={isUserMessage}>
                  {parseDate(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.Timestamp>
              )}
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                      onPress={() => movePage('Library', { memberId: partner.memberId, isYourLibrary: true })}
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
              onChangeText={setInputMessage}
              placeholder="메시지 보내기"
              style={{ flex: 1, padding: 10 }}
            />
            <S.SendButton onPress={handleSendMessage}>
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
        </S.Wrapper>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDetail;
