import { colors } from '../../../commons/styles/variablesStyles';
import MbtiComponent from '../../../commons/components/Specific/MbtiComponent/MbtiComonent';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { Image, Text, View } from 'react-native';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import useMovePage from '../../../commons/hooks/navigations/movePage/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useState } from 'react';
import { useStyleStore } from '../../../commons/store/members/style/useStyle';
import useScreenLogger from '../../../commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useManageMargin from '../../../commons/hooks/ui/manageMargin/useManageMargin';

const Mbti = () => {
  useScreenLogger();
  useManageMargin();
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
      <TitleProgress gauge={16} />
      <View style={{ width: '100%', alignItems: 'center' }}>
        <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14 }}>4가지 모두 골라주세요.</Text>
      </View>
      <MbtiComponent mbti={mbti} setMbti={setMbti} />
      <S.ButtonArea style={{ justifyContent: 'flex-end' }}>
        <S.MoveButton onPress={() => mbti.length === 4 && nextPage()}>
          <Image source={nextButton} />
        </S.MoveButton>
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default Mbti;
