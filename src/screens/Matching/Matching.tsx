import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useFetchMemberPostcard from '@commons/hooks/datas/MemberPostcard/useMemberPostcard';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { IconButton, IconImage, IconText } from '@screens/Home/screens/Home/units/Header/Header.styles';
import { useFetchReceivePostcard } from '@screens/Home/screens/Matching/hooks/useFetchReceivePostcard';
import React, { useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import * as S from './Matching.styles';
import { EmptyPostcard } from './Postcard/EmptyPostcard';
import { EType } from './Postcard/EmptyPostcard.types';
import { ReceivePostcard } from './Postcard/Receive/ReceivePostcard';

const Matching = () => {
  useScreenLogger();
  useHeaderControl({
    title: '우편함',
    left: false,
  });
  const { memberPostcard } = useFetchMemberPostcard();
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const receivedPostcards = useFetchReceivePostcard(isReceivedPostcard);
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
      <S.ListWrapper>
        <S.InfoViewStyled>
          <S.InfoTextStyled>받은 엽서 확인 시 소지한 책갈피 5개가 소모 됩니다</S.InfoTextStyled>
          <S.postcardCountViewStyled>
            <IconButton onPress={movePage('product')}>
              <IconImage source={icons.postcard} />
            </IconButton>
            <IconText>{memberPostcard}</IconText>
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
