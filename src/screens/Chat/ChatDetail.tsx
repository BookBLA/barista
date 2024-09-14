import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage, User } from '@commons/api/chat/chat.types';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import ChatRequestModal from '@screens/Chat/modals/ChatRequestModal';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const partner = {
  avatar: require('@assets/images/img/profile_ex1.png'),
  school: '서울대학교',
  smokingStatus: '흡연',
  mbti: 'ENFP',
  height: 170,
  nickname: '김서울',
};

const ChatDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params as { user: User };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const showToast = useToastStore((state) => state.showToast);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleAccept = () => {
    setIsModalVisible(false);
    showToast({ content: '채팅이 시작되었습니다.' });
  };

  const handleDecline = () => {
    setIsModalVisible(false);
    showToast({ content: '상대방이 채팅 요청을 거절했습니다.' });
  };

  const handleReport = () => {
    setIsModalVisible(false);
    showToast({ content: '신고가 접수되었습니다.' });
  };

  const loadChatMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(user.id);
      if (response.isSuccess && Array.isArray(response.result)) {
        const sortedMessages = response.result.sort(
          (a: { timestamp: string | number | Date }, b: { timestamp: string | number | Date }) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setMessages(sortedMessages);
        setDisplayedMessages(sortedMessages.slice(0, 100));
      } else {
        throw new Error('Failed to load messages');
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);

      const dummyMessages = Array.from({ length: 1000 }, (_, index) => ({
        id: (1000 - index).toString(),
        sender: (1000 - index) % 3 === 0 ? 'partner' : 'user',
        text: (1000 - index) % 3 === 0 ? `파트너의 메시지 ${1000 - index}` : `사용자의 메시지 ${1000 - index}`,
        timestamp: new Date(Date.now() - (1000 - index) * 60000).toISOString(),
      }));

      setMessages(dummyMessages);
      setDisplayedMessages(dummyMessages.slice(0, 100));
    }
  }, [user.id]);

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
            {!isUserMessage && <S.messageUsername>{partner.nickname}</S.messageUsername>}
            <S.messageRow isUserMessage={isUserMessage}>
              {/* 읽음 표시 */}
              {isUserMessage && <S.readReceipt source={require('@assets/images/icons/unRead.png')} />}
              {isUserMessage && (
                <S.timestamp isUserMessage={isUserMessage}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.timestamp>
              )}
              <S.messageBubble isUserMessage={isUserMessage}>
                <S.messageText isUserMessage={isUserMessage}>{item.text}</S.messageText>
              </S.messageBubble>
              {!isUserMessage && (
                <S.timestamp isUserMessage={isUserMessage}>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </S.timestamp>
              )}
              {!isUserMessage && <S.readReceipt source={require('@assets/images/icons/read.png')} />}
            </S.messageRow>
          </S.messageContent>
        </S.messageItemInner>
      </S.messageItem>
    );
  };

  const handleInfoPress = () => {
    navigation.navigate('ChatInfo', { partner });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <S.wrapper>
      <S.header>
        <S.backButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </S.backButton>
        <S.headerTitle>
          <S.smallAvatar source={partner.avatar} />
          <S.headerText>{partner.nickname}</S.headerText>
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
        inverted
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
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
    </S.wrapper>
  );
};

export default ChatDetail;
