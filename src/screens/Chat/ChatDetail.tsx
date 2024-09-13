import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage, User } from '@commons/api/chat/chat.types';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useRef, useState } from 'react';
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
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const loadChatMessages = async () => {
      try {
        const response = await fetchChatMessages(user.id);
        if (response.isSuccess && Array.isArray(response.result)) {
          setMessages(response.result);
        } else {
          throw new Error('Failed to load messages');
        }
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
        setMessages([
          {
            id: '1',
            text: '책을 고른 이유가 들어갈 자리입니다. 책을 고른 이유가 들어갈 자리입니다.',
            timestamp: '2023-09-07 14:31:00',
            sender: 'partner',
            image: require('@assets/images/img/prepareBookImage.png'),
          },
          {
            id: '2',
            text: "안녕하세요! '책'을 통해 서로의 취향을 알아가보는 시간을 가지면 좋을 것 같아요.",
            timestamp: '2023-09-07 14:31:00',
            sender: 'partner',
            image: '',
          },
          {
            id: '3',
            text: '네, 안녕하세요!',
            timestamp: '2023-09-08 15:00:00',
            sender: 'user',
            image: '',
          },
          {
            id: '4',
            text: '책을 고른 이유가 들어갈 자리입니다. 책을 고른 이유가 들어갈 자리입니다.',
            timestamp: '2023-09-09 15:31:00',
            sender: 'user',
            image: '',
          },
        ]);
      }
    };
    loadChatMessages();
  }, [user.id]);

  const scrollToEndImmediately = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToOffset({
        offset: messages.length * 1000,
        animated: false,
      });
    }
  };

  useEffect(() => {
    scrollToEndImmediately();
  }, [messages]);

  // 메시지를 꾹 눌렀을 때 클립보드에 복사하는 함수
  const handleLongPress = async (text: string) => {
    await Clipboard.setStringAsync(text);
    showToast({
      content: '클립보드에 복사되었습니다.',
    });
  };

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showAvatar =
      index === 0 ||
      messages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();
    const showDate =
      index === 0 || new Date(item.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();

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
          {item.sender === 'partner' && <S.MessageAvatar source={patner.avatar} />}
          <S.MessageContent sender={item.sender}>
            {item.image && <S.BookCover source={item.image} />}
            <TouchableOpacity
              delayLongPress={500} // 꾹 누르기 시작 후 500ms (0.5초) 이후에 반응하도록 설정
              onLongPress={() => handleLongPress(item.text)}
            >
              <S.MessageBubble sender={item.sender}>
                <S.MessageText sender={item.sender}>{item.text}</S.MessageText>
              </S.MessageBubble>
            </TouchableOpacity>
            <S.Timestamp>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        onContentSizeChange={scrollToEndImmediately}
        onLayout={scrollToEndImmediately}
      />

      <S.InputContainer>
        <S.TextInput placeholder="메시지 보내기" />
        <S.SendButton>
          <S.SendButtonIcon name="arrow-right" />
        </S.SendButton>
      </S.InputContainer>
    </S.Wrapper>
  );
};

export default ChatDetail;
