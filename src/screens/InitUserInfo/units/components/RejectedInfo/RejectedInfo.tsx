import * as S from '../../../InitUserInfo.styles';
import { Image, View } from 'react-native';
import { icons } from '../../../../../commons/utils/variablesImages';
import { colors } from '../../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { useCounter } from '../../../../../commons/store/useCounter';
import { TitleProgress } from '../../TitleProgress';
import useHeaderControl from '../../../../../commons/hooks/ui/headerControl/useHeaderControl';

const Case = [
  ['학생증 확인이 불가능합니다', '학생증을 다시 업로드해 주세요'],
  ['오픈채팅방이 들어가지지 않습니다', '오픈채팅방 링크를 다시 등록해주세요'],
  ['오픈채팅방이 기본프로필 전용이 아닙니다', '오픈채팅방 링크를 다시 등록해주세요'],
  ['프로필 사진이 부적절합니다', '프로필 사진을 다시 등록해주세요'],
];

const RejectedInfo = ({ rejectCase }: { rejectCase: number }) => {
  useHeaderControl({
    title: '프로필',
    left: false,
  });
  const { increment } = useCounter();
  return (
    <S.Wrapper>
      <TitleProgress gauge={100} />
      <S.ColumnStyled style={{ justifyContent: 'start' }}>
        <S.ColumnStyled style={{ height: '50%', marginTop: '25%' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image source={icons.bang} style={{ width: 51, height: 51, marginBottom: 20 }} />
            <S.ContentStyled style={{ color: colors.primary }}>가입에 실패했습니다.</S.ContentStyled>
          </View>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <CustomText font="fontBold" size="16" color={colors.errorMessageRed} sytle={{ marginBottom: 8 }}>
              실패사유: {Case[rejectCase][0]}
            </CustomText>
            <CustomText font="fontRegular" size="16" color={colors.textGray}>
              {Case[rejectCase][1]}
            </CustomText>

            <S.NextButtonStyled style={{ width: '50%', marginTop: 30 }} onPress={() => increment()}>
              <CustomText font="fontMedium" size="14" color={colors.secondary}>
                수정하러 가기
              </CustomText>
            </S.NextButtonStyled>
          </View>
        </S.ColumnStyled>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};
export default RejectedInfo;
