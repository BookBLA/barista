import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from '@screens/Notice/Notice.styles';

export const Warning = () => {
  const { handleReset } = useMovePage();
  return (
    <S.WarningWrapper>
      <S.WarningImgWrapper>
        <S.WarningImage source={icons.warning02} />
      </S.WarningImgWrapper>
      <CustomText margin="20px 0 0">받은 알림이 없습니다.</CustomText>
      <CustomText margin="0 0 26px">엽서를 보내고 알림을 보내보세요.</CustomText>
      <CustomButton contents="엽서 보내러 가기" onPress={() => handleReset('tapScreens')} />
    </S.WarningWrapper>
  );
};
