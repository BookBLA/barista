import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './UpdateModal.styles';

const UpdateModal = () => {
  const modalConfig = {
    visible: true,
    onClose: () => {},
  };

  return (
    <CustomModal modalConfig={modalConfig}>
      <S.Wrapper>
        <S.ImageWrapper>
          <S.UpdateImage source={icons.update} />
        </S.ImageWrapper>
        <CustomText font="fontMedium" margin="24px 0 0 0">
          앱이 새로워졌어요!{' '}
        </CustomText>
        <CustomText font="fontMedium" margin="5px 0">
          더 나은 서비스 이용을 위해
        </CustomText>
        <CustomText font="fontMedium">최신 버전(v.0.0.0)으로 업데이트 부탁드려요</CustomText>
        <S.ButtonWrapper>
          <CustomButton contents="업데이트" borderRadius="5px" />
        </S.ButtonWrapper>
      </S.Wrapper>
    </CustomModal>
  );
};

export default UpdateModal;
