import { fetchChatMessages } from '@commons/api/chat/chat.api';
import { ChatMessage, User } from '@commons/api/chat/chat.types';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import * as S from './ChatDetail.styles';
import InfoButton from './components/InfoButton/InfoButton';

const ChatDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params as { user: User };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

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

  // Function to scroll immediately to the end of the list
  const scrollToEndImmediately = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToOffset({
        offset: messages.length * 1000, // Setting a large enough offset to ensure the last item is in view
        animated: false, // Disable animation to make it instant
      });
    }
  };

  useEffect(() => {
    scrollToEndImmediately();
  }, [messages]);

  const renderMessageItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    const showAvatar =
      index === 0 ||
      messages[index - 1].sender !== item.sender ||
      new Date(item.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();
    const showDate =
      index === 0 || new Date(item.timestamp).getDate() !== new Date(messages[index - 1].timestamp).getDate();

    // 프로필 섹션을 첫 번째 메시지 위에 표시
    const isFirstMessage = index === 0;

    return (
      <View>
        {isFirstMessage && (
          <S.ProfileSection>
            <S.ProfileAvatar source={{ uri: user.avatar }} />
            <S.ProfileInfo>
              <S.ProfileSchool>{user.school}</S.ProfileSchool>
              <S.ProfileDetails>{`${user.smokingStatus} • ${user.mbti} • ${user.height}cm`}</S.ProfileDetails>
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
          {item.sender === 'partner' && showAvatar && <S.MessageAvatar source={{ uri: user.avatar }} />}
          <S.MessageContent sender={item.sender}>
            {item.image && <S.BookCover source={item.image} />}
            <S.MessageBubble sender={item.sender}>
              <S.MessageText sender={item.sender}>{item.text}</S.MessageText>
            </S.MessageBubble>
            <S.Timestamp>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </S.Timestamp>
          </S.MessageContent>
        </S.MessageItem>
      </View>
    );
  };

  const handleInfoPress = () => {
    navigation.navigate('ChatInfo', { user });
  };

  return (
    <S.Wrapper>
      <S.Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <S.BackButton>{'<'}</S.BackButton>
        </TouchableOpacity>
        <S.HeaderTitle>
          <S.SmallAvatar source={{ uri: user.avatar }} />
          <S.HeaderText>{user.nickname}</S.HeaderText>
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
