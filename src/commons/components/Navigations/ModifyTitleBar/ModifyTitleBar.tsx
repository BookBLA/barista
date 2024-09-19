import backArrow from '@assets/images/buttons/prevButtonBlack.png';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { colors } from '@commons/styles/variablesStyles';
import * as T from '@screens/InitBook/InitBookStack.styles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { Image, TouchableOpacity, View } from 'react-native';

const titleList = ['회원정보 수정', '스타일 수정', '내 서재'];
export const ModifyTitleBar = ({ step, callPutApi }: { step: number; callPutApi?: () => Promise<void> }) => {
  const { movePage } = useMovePage();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
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
      <T.TextButtonStyled onPress={callPutApi}>
        <CustomText color={colors.textLinkBlue} font="fontSemiBold" size="14px">
          저장
        </CustomText>
      </T.TextButtonStyled>
    </View>
  );
};
