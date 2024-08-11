import { CustomText } from '../../../../../../commons/components/Utils/TextComponents/CustomText/CustomText';
import * as S from '../../../../SettingStack.styles';

const OuterLinkModalContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">외부 링크로 이동하시겠어요?</CustomText>
      <CustomText size="12px" font="fontRegular">
        클릭 시 외부 링크로 이동합니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default OuterLinkModalContent;
