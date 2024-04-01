import useMovePage from '../../hooks/useMovePage';
import * as T from '../../../screens/InitBook/InitBook.styles';
import * as S from '../../../screens/InitUserInfo/InitUserInfo.styles';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import backArrow from '../../../../assets/images/buttons/prevButtonBlack.png';
import { CustomText } from '../TextComponents/CustomText/CustomText';
import { colors } from '../../styles/variablesStyles';

export const ModifyTitleBar = ({ step }: { step: number }) => {
  const titleList = ['회원정보 수정', '스타일 수정', '내 서재'];
  const { movePage } = useMovePage();
  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%' }}>
      <TouchableOpacity onPress={movePage()}>
        <Image source={backArrow} style={{ width: 24, height: 24, marginLeft: 14 }} />
      </TouchableOpacity>
      <View
        style={{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: 'auto',
        }}
      >
        <S.TitleStyled>{titleList[step]}</S.TitleStyled>
      </View>
      <T.TextButtonStyled>
        <CustomText color={colors.textLinkBlue} font="fontSemiBold" size="14px">
          저장
        </CustomText>
      </T.TextButtonStyled>
    </View>
  );
};
