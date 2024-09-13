import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import * as S from '@screens/Setting/SettingStack.styles';

const DeleteBookModalContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText style={{ marginBottom: 14 }} size="16px">
        내 서재에서 책 삭제하기
      </CustomText>
      <CustomText size="12px" font="fontRegular">
        내 서재에 등록한 책을 삭제하시겠어요? ㅠ-ㅠ
      </CustomText>
      <CustomText size="12px" font="fontRegular">
        등록한 책을 좋아하는 이유와 독서퀴즈도 함께 삭제됩니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default DeleteBookModalContent;
