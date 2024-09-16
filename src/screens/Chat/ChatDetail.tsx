import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage } from '@commons/api/chat/chat.types';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatRequestModal from '@screens/Chat/modals/ChatRequest/ChatRequestModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ChatDetail: React.FC = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { partner, postcard } = params as any;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isReportSubmittedModalVisible, setIsReportSubmittedModalVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [isCopyModalVisible, setCopyModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedMessage, setSelectedMessage] = useState('');
  const messageRefs = useRef<{ [key: string]: View | null }>({}); // 각 메시지의 ref를 저장

  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const reportBottomSheetRef = useRef(null);
  const showToast = useToastStore((state) => state.showToast);

  const loadChatMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(partner.id, 1, 100);
      if (response.isSuccess && response.result.content.length > 0) {
        setMessages(response.result.content);
        setDisplayedMessages(response.result.content.slice(0, 100));
      } else if (response.isSuccess && response.result.empty) {
        setMessages([]);
        setDisplayedMessages([]);
      } else {
        throw new Error('Failed to load messages or unexpected data structure');
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      setMessages([]);
      setDisplayedMessages([]);
    }
  }, [partner.id]);

  useEffect(() => {
    setIsModalVisible(true);
    loadChatMessages();
  }, [loadChatMessages]);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setShowScrollButton(value > 3000);
    });
    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  useEffect(() => {
    // TabBar 숨기기
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'none', height: 0 },
      });
    }

    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: undefined,
        });
      }
    };
  }, [navigation]);

  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
  };

  const handleDecline = () => {
    setIsDeclineModalVisible(true);
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
    const messageRef = messageRefs.current[message.id]; // 해당 메시지의 ref를 가져옴

    if (messageRef) {
      messageRef.measure((fx, fy, width, height, px, py) => {
        // 모달 크기 설정
        const modalWidth = 140; // 모달의 너비
        const modalHeight = 50; // 모달의 높이

        // 타겟(TouchableOpacity)의 위치와 크기를 기준으로 모달의 위치 계산
        const targetX = px; // 타겟의 X 좌표
        const targetY = py; // 타겟의 Y 좌표
        const targetWidth = width; // 타겟의 너비
        const targetHeight = height; // 타겟의 높이

        // 모달이 텍스트 위에 나타나야 하는 경우
        const topPositionAbove = targetY - modalHeight - 10; // 위에 나타날 경우, 10px의 여유 공간 추가

        // 모달이 텍스트 아래에 나타나야 하는 경우
        const topPositionBelow = targetY + targetHeight + 10; // 아래에 나타날 경우, 10px의 여유 공간 추가

        // 모달이 화면의 왼쪽에 나타나는 경우
        const leftPositionLeft = targetX; // 모달이 타겟 왼쪽에 나타날 때

        // 모달이 화면의 오른쪽에 나타나는 경우
        const leftPositionRight = targetX + targetWidth - modalWidth; // 모달이 타겟 오른쪽에 나타날 때

        // 화면의 높이를 기준으로 상단 또는 하단을 결정
        const isTopHalf = targetY < SCREEN_HEIGHT / 2;

        // 모달의 최종 위치 결정
        setModalPosition({
          top: isTopHalf ? topPositionBelow : topPositionAbove, // 상단에 있을 때는 아래로, 하단에 있을 때는 위로
          left: targetX + modalWidth > SCREEN_WIDTH ? leftPositionRight : leftPositionLeft, // 좌우 위치 계산
        });

        setSelectedMessage(message.text);
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

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const isUserMessage = item.sender === 'user';
    const showAvatar =
      index === 0 ||
      displayedMessages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();

    return (
      <S.MessageItem>
        {index === 0 ||
        new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate() ? (
          <S.DateSeparator>
            <S.DateText>
              {new Date(item.timestamp).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </S.DateText>
          </S.DateSeparator>
        ) : null}
        <S.MessageItemInner isUserMessage={isUserMessage}>
          {!isUserMessage && showAvatar && <S.MessageAvatar source={{ url: partner.profileImageUrl }} />}
          <S.MessageContent isUserMessage={isUserMessage}>
            {!isUserMessage && <S.MessageUsername>{partner.name}</S.MessageUsername>}
            <S.MessageRow isUserMessage={isUserMessage}>
              {isUserMessage && (
                <S.Timestamp isUserMessage={isUserMessage}>
                  {new Date(postcard.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.Timestamp>
              )}
              <S.BookChatBubble isUserMessage={isUserMessage}>
                {postcard.type.imageUrl && index === displayedMessages.length - 1 && (
                  <S.BookCover
                    source={{ uri: postcard.type.imageUrl }}
                    onError={(error) => console.error('Image load error:', error.nativeEvent.error)}
                  />
                )}
                <TouchableOpacity
                  ref={(ref) => {
                    if (ref) messageRefs.current[item.id] = ref; // 각 메시지의 ref를 저장
                  }}
                  onLongPress={(event) => handleLongPress(event, item)}
                >
                  <S.MessageBubble isUserMessage={isUserMessage}>
                    <S.MessageText isUserMessage={isUserMessage}>{item.text}</S.MessageText>
                  </S.MessageBubble>
                </TouchableOpacity>
              </S.BookChatBubble>
              {!isUserMessage && (
                <S.Timestamp isUserMessage={isUserMessage}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              <S.SmallAvatar source={{ url: partner.profileImageUrl }} />
              <S.HeaderText>{partner.name}</S.HeaderText>
            </S.HeaderTitle>
            <InfoButton onPress={() => navigation.navigate('ChatInfoScreen', { partner, handleReport })} />
          </S.Header>

          <FlatList
            ref={flatListRef}
            data={displayedMessages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
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
              <S.ProfileSection>
                <S.ProfileAvatar source={{ url: partner.profileImageUrl }} />
                <S.ProfileInfo>
                  <S.ProfileName>{partner.name}</S.ProfileName>
                  <S.ProfileSchool>{partner.school}</S.ProfileSchool>
                  <S.ProfileDetails>{`${partner.smokingStatus} • ${partner.mbti} • ${partner.height}cm`}</S.ProfileDetails>
                  <S.LibraryButton>
                    <S.LibraryButtonText>서재 구경하기</S.LibraryButtonText>
                  </S.LibraryButton>
                </S.ProfileInfo>
              </S.ProfileSection>
            }
          />

          {showScrollButton && (
            <S.ScrollToBottomButton onPress={scrollToBottom}>
              <Icon name="chevron-down" size={24} color="#1D2E61" />
            </S.ScrollToBottomButton>
          )}

          <S.InputContainer>
            <S.TextInput placeholder="메시지 보내기" />
            <S.SendButton>
              <S.SendButtonIcon source={require('@assets/images/icons/SendMessage.png')} />
            </S.SendButton>
          </S.InputContainer>

          <ChatRequestModal
            visible={isModalVisible}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onReport={handleReport}
          />

          <CustomBottomSheetModal ref={reportBottomSheetRef} index={0} snapPoints={['78%']}>
            <ReportOption bottomClose={() => reportBottomSheetRef.current?.close()} reportedMemberId={partner.id} />
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
                  <S.DeclineButton
                    onPress={() => {
                      showToast({ content: '엽서를 거절했습니다.' });
                      navigation.goBack();
                    }}
                  >
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
                      justifyContent: 'space-between', // 아이콘과 텍스트를 양 끝에 배치
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
