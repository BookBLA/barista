import useMovePage from '../../hooks/useMovePage';
import * as T from '../../../screens/InitBook/InitBookStack.styles';
import * as S from '../../../screens/InitUserInfo/InitUserInfo.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import backArrow from '../../../../assets/images/buttons/prevButtonBlack.png';
import { CustomText } from '../TextComponents/CustomText/CustomText';
import { colors } from '../../styles/variablesStyles';

export const ModifyTitleBar = ({ step, callPutApi }: { step: number; callPutApi?: () => Promise<void> }) => {
  const titleList = ['회원정보 수정', '스타일 수정', '내 서재'];
  const { movePage } = useMovePage();
  return (
    <View
      style={{
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity onPress={movePage()} style={{ width: 35 }}>
        <Image source={backArrow} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: 'auto',
        }}
      >
        <S.TitleStyled>{titleList[step]}</S.TitleStyled>
      </View>
      <T.TextButtonStyled style={{ width: 35 }} onPress={callPutApi}>
        <CustomText color={colors.textLinkBlue} font="fontSemiBold" size="14px">
          저장
        </CustomText>
      </T.TextButtonStyled>
    </View>
  );
};
