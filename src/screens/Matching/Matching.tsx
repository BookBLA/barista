import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ReceivePostcard } from './Postcard/Receive/ReceivePostcard';
import * as S from './Matching.styles';
import GoToTopButton from '../../../assets/images/icons/GoToTop.png';
import postcardIcon from '../../../assets/images/icons/Postcard.png';
import { IReceivePostcardProps } from './Postcard/Receive/ReceivePostcard.types';
import { SendPostcard } from './Postcard/Send/SendPostcard';
import { ISendPostcardProps } from './Postcard/Send/SendPostcard.types';
import { usePostcardCounter } from '../../commons/store/usePostcardCounter';

const Matching = () => {
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const [receivedPostcards, setReceivedPostcards] = useState<IReceivePostcardProps[]>([]);
  const [sendPostcards, setSendPostcards] = useState<ISendPostcardProps[]>([]);
  const postcardCounter = usePostcardCounter((state) => state.count);
  const [showButton, setShowButton] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const currentOffset: number = event.nativeEvent.contentOffset.y;
    const buttonThreshold: number = 100;

    if (currentOffset > buttonThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    //todo api 활용해서 데이터 받아오는 부분
    const receivedFakeData: IReceivePostcardProps[] = Array.from({ length: 10 }, (_, index) => ({
      index,
      postcardId: Math.floor(Math.random() * 1000) + 1,
      userId: Math.floor(Math.random() * 1000) + 1,
      quizScore: Math.floor(Math.random() * 101),
      schoolName: `School ${index + 1}`,
      age: index + 1,
      postcardImageUrl: `https://example.com/postcard-${index + 1}.jpg`,
    }));

    const sendFakeData: ISendPostcardProps[] = Array.from({ length: 10 }, (_, index) => ({
      index,
      userId: Math.floor(Math.random() * 1000) + 1,
      userName: '방근호',
      userProfileImageUrl: 'https://source.unsplash.com/random/300×300',
      gender: Math.floor(Math.random() * 2),
      schoolName: `가천대학교`,
      age: Math.floor(Math.random() * 10) + 20,
      postcardStatus: Math.floor(Math.random() * 4),
      bookName: '나미야 잡화점의 이야기',
      bookAuthor: '베르베르 베르베뉘뉘',
    }));

    setReceivedPostcards(receivedFakeData);
    setSendPostcards(sendFakeData);
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <S.ViewStyled>
        <View style={{ flex: 1, height: '80%' }}>
          <S.PressableStyled
            onPress={() => {
              setIsReceivedPostcard(true);
              setShowButton(false);
            }}
            style={({ pressed }: any) => [
              {
                backgroundColor: pressed ? 'lightgrey' : isReceivedPostcard ? 'white' : 'transparent',
              },
              S.PressableStyled,
            ]}
          >
            <S.PressableTextStyled>받은 엽서</S.PressableTextStyled>
          </S.PressableStyled>
        </View>
        <View style={{ flex: 1, height: '80%' }}>
          <S.PressableStyled
            onPress={() => {
              setIsReceivedPostcard(false);
              setShowButton(false);
            }}
            style={({ pressed }: any) => [
              {
                backgroundColor: pressed ? 'lightgrey' : isReceivedPostcard ? 'transparent' : 'white',
              },
              S.PressableStyled,
            ]}
          >
            <S.PressableTextStyled>내가 보낸 엽서</S.PressableTextStyled>
          </S.PressableStyled>
        </View>
      </S.ViewStyled>
      <S.ListWrapper>
        {isReceivedPostcard && (
          //todo 수신 받은 엽서
          <>
            <S.InfoViewStyled>
              <S.InfoTextStyled>받은 엽서 확인 시 소지한 엽서가 1개 소모 됩니다</S.InfoTextStyled>
              <S.postcardCountViewStyled>
                <Image source={postcardIcon} style={{ width: 25, height: 24 }} />
                <S.postcardCountTextStyled>{postcardCounter}</S.postcardCountTextStyled>
              </S.postcardCountViewStyled>
            </S.InfoViewStyled>
            <FlatList
              ref={flatListRef}
              onScroll={handleScroll}
              data={receivedPostcards}
              renderItem={({ item, index }) => (
                <S.receivedPostcardViewStyled index={index}>
                  <ReceivePostcard key={index} {...item} />
                </S.receivedPostcardViewStyled>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              alwaysBounceVertical={false}
              ListFooterComponent={<View style={{ height: 100 }} />}
            />
          </>
        )}
        {!isReceivedPostcard && (
          //todo 보낸 엽서
          <>
            <FlatList
              ref={flatListRef}
              onScroll={handleScroll}
              data={sendPostcards}
              renderItem={({ item, index }) => (
                <S.sendPostcardViewStyled>
                  <SendPostcard key={index} {...item} />
                </S.sendPostcardViewStyled>
              )}
              keyExtractor={(item, index) => index.toString()}
              alwaysBounceVertical={false}
              ListFooterComponent={<View style={{ height: 100 }} />}
            />
          </>
        )}
      </S.ListWrapper>
      {showButton && (
        <TouchableOpacity style={S.styles.GoToTopButton} onPress={scrollToTop}>
          <S.GoToTopImage source={GoToTopButton} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Matching;
