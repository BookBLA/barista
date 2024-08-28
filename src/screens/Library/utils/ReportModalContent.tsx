import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import * as S from '@screens/Setting/SettingStack.styles';

const ReportModalContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">신고가 접수되었습니다.</CustomText>
      <CustomText size="12px" font="fontRegular">
        최대 24시간 안에 검토가 완료됩니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default ReportModalContent;
