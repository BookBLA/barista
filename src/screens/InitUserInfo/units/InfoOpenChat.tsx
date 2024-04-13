import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import useMovePage from '../../../commons/hooks/useMovePage';
import openChat1 from '../../../../assets/images/img/openChat1.png';
import openChat2 from '../../../../assets/images/img/openChat2.png';
import openChat3 from '../../../../assets/images/img/openChat3.png';
import openChat4 from '../../../../assets/images/img/openChat4.png';
import openChat5 from '../../../../assets/images/img/openChat5.png';
import openChat6 from '../../../../assets/images/img/openChat6.png';
import openChat7 from '../../../../assets/images/img/openChat7.png';
import openChat8 from '../../../../assets/images/img/openChat8.png';
import React, { useState } from 'react';
import { Image, ScrollView, Dimensions, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import useManageMargin from '../../../commons/hooks/useManageMargin';

const { width } = Dimensions.get('window');

const Row = styled.View`
  flex-direction: row;
  //height: 70%;
`;
// const CarouselContainer = styled.View`
//   flex: 1;
// `;
const CarouselItemContainer = styled.View`
  width: ${(props) => props.width}px;
  height: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const CarouselItem = styled.View`
  flex: 1;
  background-color: ${(props) => props.color};
`;
const DotContainer = styled.View`
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;
const Dot = styled.View`
  width: ${(props) => (props.isFocused ? '9px' : '7px')};
  height: ${(props) => (props.isFocused ? '9px' : '7px')};
  margin: 0px 5px;
  background-color: ${(props) => (props.isFocused ? colors.primary : colors.textGray)};
  border-radius: 10px;
`;
const ChevronBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  height: 80%;
`;

const InfoOpenChat = ({ again }: { again: boolean }) => {
  useManageMargin();
  const { movePage } = useMovePage();
  const images = [openChat1, openChat2, openChat3, openChat4, openChat5, openChat6, openChat7, openChat8];
  const contents = [
    '1. 카카오톡 하단 메뉴 오픈 채팅방 클릭',
    '2. 오픈채팅방 생성하기 클릭',
    '3. 1:1 채팅방 만들기',
    '4. 북블라 채팅방 이름 정하기',
    '5. (필수) 기본프로필만 참가 허용하기',
    '6. 검색허용 반드시 끄기',
    '7. 링크 복사 후 위 입력칸에 붙여넣기',
    '8. 이성에게 연락 받을 북블라 채팅방 완성',
  ];
  const [itemWidth, setItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScrollEnd = (e) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const index = Math.floor(xOffset / itemWidth);
    setCurrentIndex(index);
  };

  const indexToOffset = () => {
    return { x: currentIndex * itemWidth, y: 0 };
  };

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end', backgroundColor: 'white' }}>
      <>
        <LinearGradient style={{ flex: 1 }} colors={['#F7F4ED', 'white']}>
          <ScrollView
            style={{}}
            onMomentumScrollEnd={onScrollEnd}
            horizontal
            pagingEnabled
            contentContainerStyle={{ width: `${100 * images.length}%` }}
            scrollEventThrottle={200}
            decelerationRate="fast"
            onContentSizeChange={(w) => setItemWidth(w / images.length)}
            contentOffset={indexToOffset()}
            showsHorizontalScrollIndicator={false}
          >
            <Row>
              {images.map((image, index) => (
                <CarouselItemContainer key={index} width={itemWidth}>
                  <Image source={image} style={{ width: 336, height: 356, objectFit: 'fill' }} />

                  <S.OpenChatTitleStyled>본인 오픈채팅방 링크 달기</S.OpenChatTitleStyled>
                  {index === 4 ? (
                    <S.OpenChatContentStyled>
                      <S.TextStyled style={{ color: colors.primary }}>5. (필수) </S.TextStyled>
                      <S.TextStyled style={{ color: colors.errorMessageRed, fontFamily: 'fontSemiBold' }}>
                        기본프로필
                      </S.TextStyled>
                      <S.TextStyled style={{ color: colors.primary }}>만 참가 허용하기</S.TextStyled>
                    </S.OpenChatContentStyled>
                  ) : (
                    <S.OpenChatContentStyled key={index}>
                      <Text style={{ color: colors.primary }}>{contents[index]}</Text>
                    </S.OpenChatContentStyled>
                  )}
                </CarouselItemContainer>
              ))}
            </Row>
          </ScrollView>
        </LinearGradient>
        <DotContainer>
          {images.map((_, index) => {
            const isFocused = currentIndex === index;
            return <Dot key={index} isFocused={isFocused} />;
          })}
        </DotContainer>
      </>
      <S.NextButtonStyled onPress={movePage()}>
        {again ? (
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>홈으로 가기</Text>
        ) : (
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>시작하기</Text>
        )}
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default InfoOpenChat;
