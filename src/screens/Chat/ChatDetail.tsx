// ChatDetail.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage, User } from '@commons/api/chat/chat.types';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import ChatRequestModal from '@screens/Chat/modals/ChatRequestModal';
import styles from './ChatDetail.styles';
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
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

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
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
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
  }, []);

  const loadMoreMessages = () => {
    if (loadingMore || displayedMessages.length >= messages.length) return;

    setLoadingMore(true);

    const currentLength = displayedMessages.length;
    const additionalMessages = messages.slice(currentLength, currentLength + 100);

    setDisplayedMessages((prev) => [...prev, ...additionalMessages]);
    setLoadingMore(false);
  };

  const handleLongPress = async (text: string) => {
    await Clipboard.setStringAsync(text);
    showToast({
      content: '클립보드에 복사되었습니다.',
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
  };

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showAvatar =
      index === 0 ||
      displayedMessages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();
    const showDate =
      index === 0 || new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();

    // 제일 오래된 메시지인지이며, 첫 메시지인지 여부
    const isFirstMessage = index === displayedMessages.length - 1 && index === messages.length - 1;

    return (
      <View>
        {isFirstMessage && (
          <View style={styles.profileSection}>
            <Image source={partner.avatar} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileSchool}>{partner.school}</Text>
              <Text
                style={styles.profileDetails}
              >{`${partner.smokingStatus} • ${partner.mbti} • ${partner.height}cm`}</Text>
              <TouchableOpacity style={styles.libraryButton}>
                <Text style={styles.libraryButtonText}>서재 구경하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showDate && (
          <View style={styles.dateSeparator}>
            <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleDateString()}</Text>
          </View>
        )}
        <View style={styles.messageItem}>
          {item.sender === 'partner' && showAvatar && <Image source={partner.avatar} style={styles.messageAvatar} />}
          <View style={[styles.messageContent, { alignItems: item.sender === 'user' ? 'flex-end' : 'flex-start' }]}>
            {item.sender === 'partner' && <Text style={styles.messageUsername}>{partner.nickname}</Text>}
            <TouchableOpacity delayLongPress={500} onLongPress={() => handleLongPress(item.text)}>
              <View style={[styles.messageBubble, { backgroundColor: item.sender === 'user' ? '#1D2E61' : '#f1f1f1' }]}>
                <Text style={[styles.messageText, { color: item.sender === 'user' ? '#ffffff' : '#000000' }]}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.timestamp,
                { marginLeft: item.sender === 'user' ? 8 : 0, marginRight: item.sender === 'partner' ? 8 : 0 },
              ]}
            >
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleInfoPress = () => {
    navigation.navigate('ChatInfo', { partner });
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Image source={partner.avatar} style={styles.smallAvatar} />
          <Text style={styles.headerText}>{partner.nickname}</Text>
        </View>
        <InfoButton onPress={handleInfoPress} />
      </View>

      <FlatList
        ref={flatListRef}
        data={displayedMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.loadingIndicator} /> : null}
        inverted
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      />

      {showScrollButton && (
        <TouchableOpacity style={styles.scrollToBottomButton} onPress={scrollToBottom}>
          <Icon name="chevron-down" size={24} color="#1D2E61" />
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="메시지 보내기" />
        <TouchableOpacity style={styles.sendButton}>
          <Image source={require('@assets/images/icons/SendMessage.png')} style={styles.sendButtonIcon} />
        </TouchableOpacity>
      </View>

      <ChatRequestModal
        visible={isModalVisible}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onReport={handleReport}
      />
    </View>
  );
};

export default ChatDetail;
