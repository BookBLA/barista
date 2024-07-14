import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import * as S from '../../../../SettingStack.styles';

const AlarmContent = () => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">알림 끄기</CustomText>
      <CustomText size="12px" font="fontRegular">
        알림을 끄시면 엽서 확인이 어려워 매칭 신청을 놓칠 수 있어요. 정말 알림을 끄시겠어요?
      </CustomText>
    </S.ModalWrapper>
  );
};

export default AlarmContent;
