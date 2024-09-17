import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import MbtiComponent from '@commons/components/Specific/MbtiComponent/MbtiComonent';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

const Mbti = () => {
  useHeaderControl({
    title: '스타일',
    left: false,
  });
  useScreenLogger();
  useAppUIManager();
  const { updateStyleInfo, styleInfo } = useStyleStore();

  const { movePage } = useMovePage();
  const [mbti, setMbti] = useState(styleInfo.mbti.split(''));

  const nextPage = () => {
    const mbtiString = mbti.join('');
    // console.log('mbtiString', mbtiString);
    updateStyleInfo('mbti', mbtiString);
    // console.log('styleInfo', styleInfo);
    movePage('smokeDrink')();
  };

  return (
    <S.Wrapper>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          height: '90%',
          justifyContent: 'center',
        }}
      >
        <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 38 }}>
          4가지 모두 골라주세요.
        </Text>
        <MbtiComponent mbti={mbti} setMbti={setMbti} />
      </View>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        <S.MoveButton onPress={() => mbti.length === 4 && nextPage()}>
          <Image source={nextButton} />
        </S.MoveButton>
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default Mbti;
