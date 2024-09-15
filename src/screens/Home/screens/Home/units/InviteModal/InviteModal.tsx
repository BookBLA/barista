import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './InviteModal.styles';

const InviteModal = () => {
  return (
    <S.Wrapper>
      <CustomText font="fontMedium">가입을 축하합니다!</CustomText>
      <CustomText font="fontRegular" size="12px">
        무료 책갈피로 매칭을 시작해 보세요!{' '}
      </CustomText>
      <CustomText font="fontRegular" size="12px" margin="0 0 22px">
        친구를 초대하고 무료 책갈피를 더 받아보세요:)
      </CustomText>

      <S.CoinWrapper>
        <S.ImageWrapper>
          <S.CoinImage source={icons.inviteCoin} />
        </S.ImageWrapper>
      </S.CoinWrapper>
      <S.ButtonWrapper>
        <CustomButton contents="수령완료" />
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default InviteModal;
