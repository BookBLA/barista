import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { colors } from '@commons/styles/variablesStyles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { Image, View } from 'react-native';

const RejectStudentId = () => {
  useHeaderControl({
    title: '학생증 인증',
    left: true,
    onPressLeft: () => handleReset('tapScreens'),
  });
  const { movePage, handleReset } = useMovePage();

  return (
    <S.Wrapper>
      <View style={{ width: '95%', alignItems: 'center', marginTop: '34%' }}>
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
          <Image source={icons.bang} style={{ width: 51, height: 51, marginBottom: 20 }} />
          <CustomText font="fontMedium" size="20" color={colors.primary}>
            인증에 실패했습니다.
          </CustomText>
        </View>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <CustomText font="fontMedium" size="16" color={colors.errorMessageRed} style={{ marginBottom: 6 }}>
            실패 사유 : 학생증 확인이 불가능합니다
          </CustomText>
          <CustomText font="fontRegular" size="16" color={'black'}>
            학생증을 다시 업로드해 주세요
          </CustomText>

          <S.NextButtonStyled
            style={{ width: 150, marginTop: 30, height: 44 }}
            onPress={movePage('studentId', { isRejected: true })}
          >
            <CustomText font="fontMedium" size="14" color={colors.secondary}>
              수정하러 가기
            </CustomText>
          </S.NextButtonStyled>
        </View>
      </View>
    </S.Wrapper>
  );
};
export default RejectStudentId;
