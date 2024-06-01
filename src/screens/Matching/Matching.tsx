import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ReceivePostcard } from './Postcard/Receive/ReceivePostcard';
import * as S from './Matching.styles';
import GoToTopButton from '../../../assets/images/icons/GoToTop.png';
import postcardIcon from '../../../assets/images/icons/Postcard.png';
import { SendPostcard } from './Postcard/Send/SendPostcard';
import { EType } from './Postcard/EmptyPostcard.types';
import { EmptyPostcard } from './Postcard/EmptyPostcard';
import useFetchMemberPostcard from '../../commons/hooks/useMemberPostcard';
import { useFetchReceivePostcard } from '../Home/screens/Matching/hooks/useFetchReceivePostcard';
import { useFetchSendPostcard } from '../Home/screens/Matching/hooks/useFetchSendPostcard';

const Matching = () => {
  const { memberPostcard } = useFetchMemberPostcard();
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const receivedPostcards = useFetchReceivePostcard();
  const sendPostcards = useFetchSendPostcard();
  const [showButton, setShowButton] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    const currentOffset: number = event.nativeEvent.contentOffset.y;
    const buttonThreshold: number = 100;
    setScrollPosition(event.nativeEvent.contentOffset.y);

    if (currentOffset > buttonThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    // 화면에 돌아왔을 때 스크롤 위치를 설정
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: scrollPosition, animated: false });
    }
  }, [scrollPosition]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <S.Wrapper>
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
                <S.postcardCountTextStyled>{memberPostcard}</S.postcardCountTextStyled>
              </S.postcardCountViewStyled>
            </S.InfoViewStyled>
            {receivedPostcards.length === 0 && <EmptyPostcard type={EType.RECEIVE} />}
            {receivedPostcards.length > 0 && (
              <FlatList
                ref={flatListRef}
                onScroll={handleScroll}
                data={receivedPostcards}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ height: '100%', width: '50%' }}>
                      <S.receivedPostcardViewStyled style={S.styles.PostcardShadow} index={index}>
                        <ReceivePostcard key={item.postcardId} {...item} />
                      </S.receivedPostcardViewStyled>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.postcardId}
                numColumns={2}
                alwaysBounceVertical={false}
                ListFooterComponent={<View style={{ height: 100 }} />}
                overScrollMode="never"
              />
            )}
          </>
        )}
        {!isReceivedPostcard && (
          //todo 보낸 엽서
          <>
            {sendPostcards.length === 0 && <EmptyPostcard type={EType.SEND} />}
            {sendPostcards.length > 0 && (
              <FlatList
                ref={flatListRef}
                onScroll={handleScroll}
                data={sendPostcards}
                renderItem={({ item, index }) => {
                  return (
                    <S.sendPostcardViewStyled>
                      <SendPostcard key={index} {...item} />
                    </S.sendPostcardViewStyled>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
                alwaysBounceVertical={false}
                ListFooterComponent={<View style={{ height: 100 }} />}
                overScrollMode="never"
              />
            )}
          </>
        )}
      </S.ListWrapper>
      {showButton && (
        <TouchableOpacity style={S.styles.GoToTopButton} onPress={scrollToTop}>
          <S.GoToTopImage source={GoToTopButton} />
        </TouchableOpacity>
      )}
    </S.Wrapper>
  );
};

export default Matching;
