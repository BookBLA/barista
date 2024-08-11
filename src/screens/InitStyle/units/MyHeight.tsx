import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/navigations/movePage/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useStyleStore } from '../../../commons/store/members/style/useStyle';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import useManageMargin from '../../../commons/hooks/ui/manageMargin/useManageMargin';

const buttonTitles = [
  '150cm 미만',
  '150cm 이상 ~ 155cm 미만',
  '155cm 이상 ~ 160cm 미만',
  '160cm 이상 ~ 165cm 미만',
  '165cm 이상 ~ 170cm 미만',
  '170cm 이상 ~ 175cm 미만',
  '175cm 이상 ~ 180cm 미만',
  '180cm 이상 ~ 185cm 미만',
  '185cm 이상 ~ 190cm 미만',
  '190cm 이상 ~',
];
const MyHeight = () => {
  useManageMargin();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={83} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 38, marginTop: 30 }}>본인의 키를 알려주세요</S.ContentStyled>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '85%',
            }}
          >
            {buttonTitles.map((title, index) => (
              <T.LongButtonStyled
                key={index}
                isSelect={styleInfo.heightType === title}
                onPress={() => updateStyleInfo('heightType', title)}
              >
                <S.ButtonTextStyled isSelect={styleInfo.heightType === title}>{title}</S.ButtonTextStyled>
              </T.LongButtonStyled>
            ))}
          </View>
        </View>
      </S.ColumnStyled>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.heightType === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('personalQuestion')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default MyHeight;
