// ChatDetail.tsx

import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage, User } from '@commons/api/chat/chat.types';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ChatRequestModal from '@screens/Chat/modals/ChatRequestModal';
import * as Clipboard from 'expo-clipboard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const patner = {
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

  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태 추가

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
        const reversedMessages = response.result.reverse(); // 메시지를 최신순으로 역순 정렬
        setMessages(reversedMessages);
        setDisplayedMessages(reversedMessages.slice(0, 100)); // 처음 100개의 메시지만 표시
      } else {
        throw new Error('Failed to load messages');
      }
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);

      // 1000개의 더미 데이터 생성
      const dummyMessages = Array.from({ length: 1000 }, (_, index) => ({
        id: (index + 1).toString(),
        sender: index % 2 === 0 ? 'partner' : 'user',
        text: index % 2 === 0 ? `파트너의 메시지 ${index + 1}` : `사용자의 메시지 ${index + 1}`,
        timestamp: new Date(Date.now() - index * 60000).toISOString(), // 각 메시지의 시간을 1분씩 이전으로 설정
      })).reverse(); // 최신순으로 역순 정렬

      setMessages(dummyMessages);
      setDisplayedMessages(dummyMessages.slice(0, 100)); // 처음 100개의 메시지만 표시
    }
  }, [user.id]);

  useEffect(() => {
    setIsModalVisible(true); // 채팅방 생성 시 모달을 띄움
    loadChatMessages();
  }, [loadChatMessages]);

  // FlatList가 처음 렌더링될 때 맨 아래부터 표시되도록 설정
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false }); // 맨 아래부터 시작
    }
  }, [displayedMessages]);

  const loadMoreMessages = () => {
    if (loadingMore || displayedMessages.length >= messages.length) return;

    setLoadingMore(true);

    // 100개씩 추가 로드
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

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showAvatar =
      index === 0 ||
      displayedMessages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();
    const showDate =
      index === 0 || new Date(item.timestamp).getDate() !== new Date(displayedMessages[index - 1].timestamp).getDate();

    // 모든 대화중에 제일 첫번째 메시지인지 확인
    const isFirstMessage = index === 0;
    return (
      <View>
        {isFirstMessage && (
          <S.ProfileSection>
            <S.ProfileAvatar source={patner.avatar} />
            <S.ProfileInfo>
              <S.ProfileSchool>{patner.school}</S.ProfileSchool>
              <S.ProfileDetails>{`${patner.smokingStatus} • ${patner.mbti} • ${patner.height}cm`}</S.ProfileDetails>
              <S.LibraryButton>
                <S.LibraryButtonText>서재 구경하기</S.LibraryButtonText>
              </S.LibraryButton>
            </S.ProfileInfo>
          </S.ProfileSection>
        )}
        {showDate && (
          <S.DateSeparator>
            <S.DateText>{new Date(item.timestamp).toLocaleDateString()}</S.DateText>
          </S.DateSeparator>
        )}
        <S.MessageItem>
          {item.sender === 'partner' && showAvatar && <S.MessageAvatar source={patner.avatar} />}
          <S.MessageContent sender={item.sender}>
            {item.sender === 'partner' && <S.MessageUsername>{patner.nickname}</S.MessageUsername>}
            {/* TouchableOpacity와 S.Timestamp를 좌우로 정렬하기 위한 더미 뷰 */}
            <TouchableOpacity delayLongPress={500} onLongPress={() => handleLongPress(item.text)}>
              <S.MessageBubble sender={item.sender}>
                <S.MessageText sender={item.sender}>{item.text}</S.MessageText>
              </S.MessageBubble>
            </TouchableOpacity>
            <S.Timestamp sender={item.sender}>
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </S.Timestamp>
          </S.MessageContent>
        </S.MessageItem>
      </View>
    );
  };

  const handleInfoPress = () => {
    navigation.navigate('ChatInfo', { patner });
  };

  return (
    <S.Wrapper>
      <S.Header>
        <TouchableOpacity onPress={() => navigation.goBack()} style={S.styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <S.HeaderTitle>
          <S.SmallAvatar source={patner.avatar} />
          <S.HeaderText>{patner.nickname}</S.HeaderText>
        </S.HeaderTitle>
        <InfoButton onPress={handleInfoPress} />
      </S.Header>

      <FlatList
        ref={flatListRef}
        data={displayedMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        onEndReached={loadMoreMessages} // 위로 스크롤 시 더 많은 메시지 로드
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <S.LoadingIndicator /> : null}
        inverted // 리스트를 역순으로 표시하여 최신 메시지가 아래에 위치하도록 설정
        initialNumToRender={20} // 처음 렌더링할 아이템 수 조정
        maxToRenderPerBatch={20} // 한번에 렌더링할 최대 아이템 수 조정
        windowSize={10} // 렌더링할 스크린 크기 대비 뷰포트 크기 조정
        removeClippedSubviews // 화면 밖의 보이지 않는 뷰 제거하여 성능 향상
      />

      <S.TopButton
        onPress={() => flatListRef.current?.scrollToOffset({ offset: 0 })}
        // 만약 보이는 메시지가 100개 이상이면 보이고 아니면 안보임
        // 그리고 스크롤이 맨 위에 있을 때만 보이도록 설정
        style={{
          display: displayedMessages.length >= 200 && displayedMessages.length < messages.length ? 'flex' : 'none',
        }}
      >
        <S.TopButtonIcon name="arrow-right" />
      </S.TopButton>

      <S.InputContainer>
        <S.TextInput placeholder="메시지 보내기" />
        <S.SendButton>
          <S.SendButtonIcon source={require('@assets/images/icons/SendMessage.png')} />
        </S.SendButton>
      </S.InputContainer>

      {/* 채팅 요청 모달 */}
      <ChatRequestModal
        visible={isModalVisible}
        onAccept={handleAccept}
        onDecline={handleDecline}
        onReport={handleReport}
      />
    </S.Wrapper>
  );
};

export default ChatDetail;
