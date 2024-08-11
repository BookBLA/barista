import { CustomText } from '../../../../../../commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import * as S from '../../../../SettingStack.styles';

const LogOutContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">로그아웃 하시겠어요?</CustomText>
      <CustomText size="12px">아래 계정으로 다시 로그인 할 수 있습니다.</CustomText>
      <CustomText size="12px" color={colors.primary}>
        카카오톡 로그인
      </CustomText>
    </S.ModalWrapper>
  );
};

export default LogOutContent;
