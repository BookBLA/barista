import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { ReceivePostcard } from './Postcard/Receive/ReceivePostcard';
import * as S from './Matching.styles';
import { SendPostcard } from './Postcard/Send/SendPostcard';
import { EType } from './Postcard/EmptyPostcard.types';
import { EmptyPostcard } from './Postcard/EmptyPostcard';
import useFetchMemberPostcard from '../../commons/hooks/useMemberPostcard';
import { useFetchReceivePostcard } from '../Home/screens/Matching/hooks/useFetchReceivePostcard';
import { useFetchSendPostcard } from '../Home/screens/Matching/hooks/useFetchSendPostcard';
import { icons } from '../../commons/utils/variablesImages';
import { IconButton, IconImage } from '../Home/screens/Home/units/Header/Header.styles';
import useMovePage from '../../commons/hooks/useMovePage';
import { useUserStore } from '../../commons/store/useUserinfo';
import useAnalyticsEventLogger from '../../commons/hooks/useAnalyticsEventLogger';
import useScreenLogger from '../../commons/hooks/useAnalyticsScreenLogger';

const Matching = () => {
  useScreenLogger();
  const { memberPostcard } = useFetchMemberPostcard();
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const receivedPostcards = useFetchReceivePostcard(isReceivedPostcard);
  const sendPostcards = useFetchSendPostcard(isReceivedPostcard);
  const [showButton, setShowButton] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const { movePage } = useMovePage();
  const { userInfo } = useUserStore();
  const logEvent = useAnalyticsEventLogger();

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
        {isReceivedPostcard ? (
          <>
            <S.InfoViewStyled>
              <S.InfoTextStyled>받은 엽서 확인 시 소지한 책갈피 35개가 소모 됩니다</S.InfoTextStyled>
              <S.postcardCountViewStyled>
                <IconButton onPress={movePage('product')}>
                  <IconImage source={icons.postcard} />
                </IconButton>
                <S.postcardCountTextStyled>{memberPostcard}</S.postcardCountTextStyled>
              </S.postcardCountViewStyled>
            </S.InfoViewStyled>
            {receivedPostcards.length === 0 && <EmptyPostcard type={EType.RECEIVE} />}
            {receivedPostcards.length > 0 && (
              <FlatList
                style={{ paddingLeft: 16, paddingRight: 16, marginTop: 10 }}
                ref={flatListRef}
                data={receivedPostcards}
                renderItem={({ item, index }) => (
                  <View style={{ height: '100%', width: '50%' }}>
                    <S.receivedPostcardViewStyled style={S.styles.PostcardShadow} index={index}>
                      <ReceivePostcard key={item.postcardId} {...item} />
                    </S.receivedPostcardViewStyled>
                  </View>
                )}
                keyExtractor={(item) => item.postcardId.toString()}
                numColumns={2}
                onScroll={handleScroll}
                alwaysBounceVertical={false}
                ListFooterComponent={<View style={{ height: 100 }} />}
                overScrollMode="never"
              />
            )}
          </>
        ) : (
          <>
            {sendPostcards.length === 0 && <EmptyPostcard type={EType.SEND} />}
            {sendPostcards.length > 0 && (
              <FlatList
                style={{ paddingLeft: 16, paddingRight: 16 }}
                ref={flatListRef}
                data={sendPostcards}
                renderItem={({ item, index }) => (
                  <S.sendPostcardViewStyled>
                    <SendPostcard key={item.postcardId} {...item} />
                  </S.sendPostcardViewStyled>
                )}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}
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
          <S.GoToTopImage source={icons.goToTop} />
        </TouchableOpacity>
      )}
    </S.Wrapper>
  );
};

export default Matching;
