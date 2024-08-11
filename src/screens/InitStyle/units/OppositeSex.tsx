import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { Image, View } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/navigations/movePage/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useStyleStore } from '../../../commons/store/members/style/useStyle';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import useScreenLogger from '../../../commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useManageMargin from '../../../commons/hooks/ui/manageMargin/useManageMargin';

const buttonTitles = ['허용 X', '단둘이 밥 먹기', '단둘이 술 먹기', '단둘이 여행 가기', '상관 없음'];
const OppositeSex = () => {
  useScreenLogger();
  useManageMargin();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 38 }}>이성 친구 허용범위를 알려주세요.</S.ContentStyled>
          {buttonTitles.map((title, index) => (
            <T.LongButtonStyled
              key={index}
              isSelect={styleInfo.justFriendType === title}
              onPress={() => updateStyleInfo('justFriendType', title)}
            >
              <S.ButtonTextStyled isSelect={styleInfo.justFriendType === title}>{title}</S.ButtonTextStyled>
            </T.LongButtonStyled>
          ))}
        </View>
      </S.ColumnStyled>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.justFriendType === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('commStyle')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default OppositeSex;
