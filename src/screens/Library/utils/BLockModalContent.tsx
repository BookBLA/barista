import { CustomText } from '../../../commons/components/Utils/TextComponents/CustomText/CustomText';
import * as S from '../../Setting/SettingStack.styles';

const BlockModalContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">차단하시겠어요?</CustomText>
      <CustomText size="12px" font="fontRegular">
        서로를 더 이상 볼 수 없습니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default BlockModalContent;
