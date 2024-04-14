import { Image, Text, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import { icons } from '../../../commons/utils/variablesImages';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText.styles';

const FailedSign = () => {
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={100} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image source={icons.bang} style={{ width: 51, height: 51, marginBottom: 20 }} />
          <S.ContentStyled style={{ color: colors.primary }}>가입에 실패했습니다.</S.ContentStyled>
          <CustomText font="fontBold" size="16" color={colors.errorMessageRed} sytle={{ marginBottom: 8 }}>
            실패사유 : 학생증 확인이 불가능합니다.
          </CustomText>
          <CustomText font="fontRegular" size="16" color={colors.textGray}>
            학생증을 다시 업로드해 주세요.
          </CustomText>
          <S.NextButtonStyled style={{ width: '50%' }}>
            <CustomText font="fontMedium" size="14" color={colors.secondary}>
              수정하러 가기
            </CustomText>
          </S.NextButtonStyled>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default FailedSign;
