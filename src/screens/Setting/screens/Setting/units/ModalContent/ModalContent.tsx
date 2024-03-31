import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import * as S from '../../../../SettingStack.styles';

const ModalContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">모든 연락처에 노출하지 않기</CustomText>
      <CustomText size="12px" font="fontRegular">
        기능을 활성화하기 위해서 연락처 접근 권한이 필요합니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default ModalContent;
