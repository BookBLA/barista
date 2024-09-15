import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage } from '@commons/api/chat/chat.types';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatRequestModal from '@screens/Chat/modals/ChatRequest/ChatRequestModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption'; // Import ReportOption component
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const ChatDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { partner } = route.params as { user: { name: string; avatar: any; lastMessage: string } };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const showToast = useToastStore((state) => state.showToast);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isReportSubmittedModalVisible, setIsReportSubmittedModalVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const reportBottomSheetRef = useRef(null); // Ref for the CustomBottomSheetModal

  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
  };

  const handleDecline = () => {
    setIsModalVisible(false);
    setIsDeclineModalVisible(true);
  };

  const handleReport = () => {
    setIsModalVisible(false);
    reportBottomSheetRef.current?.present(); // Open the report bottom sheet
  };

  const closeDeclineModal = () => {
    setIsDeclineModalVisible(false);
    setIsModalVisible(true);
  };

  const closeReportSubmittedModal = () => {
    setIsReportSubmittedModalVisible(false);
    navigation.goBack();
  };

  const loadChatMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(partner.id, 1, 100);

      // 응답 성공 및 결과 데이터가 빈 배열인지 확인
      if (response.isSuccess && response.result && response.result.content && response.result.content.length > 0) {
        console.log('Successfully loaded chat messages:', response.result.content);

        setMessages(response.result.content);
        setDisplayedMessages(response.result.content.slice(0, 100));
      } else if (response.isSuccess && response.result.empty) {
        // 메시지가 빈 경우 처리
        console.warn('No messages available.');
        setMessages([]);
        setDisplayedMessages([]);
      } else {
        throw new Error('Failed to load messages or unexpected data structure');
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
      setMessages(dummyMessages);
      setDisplayedMessages(dummyMessages);
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
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }

    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: undefined, // This will reset to the default style
        });
      }
    };
  }, [navigation]);

  const loadMoreMessages = () => {
    if (loadingMore || displayedMessages.length >= messages.length) return;
    setLoadingMore(true);
    const currentLength = displayedMessages.length;
    const additionalMessages = messages.slice(currentLength, currentLength + 100);
    setDisplayedMessages((prev) => [...prev, ...additionalMessages]);
    setLoadingMore(false);
  };

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const isUserMessage = item.sender === 'user';
    const showAvatar =
      index === 0 ||
      displayedMessages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();

    return (
      <S.messageItem>
        {index === 0 ||
        new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate() ? (
          <S.dateSeparator>
            <S.dateText>
              {new Date(item.timestamp).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </S.dateText>
          </S.dateSeparator>
        ) : null}
        <S.messageItemInner isUserMessage={isUserMessage}>
          {!isUserMessage && showAvatar && <S.messageAvatar source={partner.avatar} />}
          <S.messageContent isUserMessage={isUserMessage}>
            {!isUserMessage && <S.messageUsername>{partner.name}</S.messageUsername>}
            <S.messageRow isUserMessage={isUserMessage}>
              {isUserMessage && <S.readReceipt source={require('@assets/images/icons/unRead.png')} />}
              {isUserMessage && (
                <S.timestamp isUserMessage={isUserMessage}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.timestamp>
              )}
              <TouchableOpacity onLongPress={() => Alert.alert('메시지 길게 누름')}>
                <S.messageBubble isUserMessage={isUserMessage}>
                  <S.messageText isUserMessage={isUserMessage}>{item.text}</S.messageText>
                </S.messageBubble>
              </TouchableOpacity>
              {!isUserMessage && (
                <S.timestamp isUserMessage={isUserMessage}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.timestamp>
              )}
            </S.messageRow>
          </S.messageContent>
        </S.messageItemInner>
      </S.messageItem>
    );
  };

  const handleInfoPress = () => {
    // 키보드 닫음
    Keyboard.dismiss();
    navigation.navigate('ChatInfoScreen', { partner, handleReport });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <S.wrapper>
          <S.header>
            <S.backButton onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </S.backButton>
            <S.headerTitle>
              <S.smallAvatar source={partner.avatar} />
              <S.headerText>{partner.name}</S.headerText>
            </S.headerTitle>
            <InfoButton onPress={handleInfoPress} />
          </S.header>

          <FlatList
            ref={flatListRef}
            data={displayedMessages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <S.loadingIndicator /> : null}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            ListHeaderComponent={
              <S.ProfileSection>
                <S.ProfileAvatar source={partner.avatar} />
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
            <S.scrollToBottomButton onPress={scrollToBottom}>
              <Icon name="chevron-down" size={24} color="#1D2E61" />
            </S.scrollToBottomButton>
          )}

          <S.inputContainer>
            <S.textInput placeholder="메시지 보내기" />
            <S.sendButton>
              <S.sendButtonIcon source={require('@assets/images/icons/SendMessage.png')} />
            </S.sendButton>
          </S.inputContainer>

          <ChatRequestModal
            visible={isModalVisible}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onReport={handleReport}
          />

          {/* Replacing ReportModal with CustomBottomSheetModal */}
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
        </S.wrapper>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDetail;
