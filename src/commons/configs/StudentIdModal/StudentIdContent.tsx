import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import * as S from '@screens/Setting/SettingStack.styles';

const StudentIdContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">학생증 인증하기</CustomText>
      <CustomText size="12px">
        학생증 인증 후 엽서를 보낼 수 있어요.{'\n'}학생증 인증 성공 시{' '}
        <CustomText size="12px" font="fontBold">
          무료 매칭 1회권
        </CustomText>
        을 드립니다.
      </CustomText>
    </S.ModalWrapper>
  );
};

export default StudentIdContent;
