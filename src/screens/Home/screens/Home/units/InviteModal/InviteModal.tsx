import { postInvitationRewardStatus } from '@commons/api/modal/modal.api';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { Modal } from 'react-native';
import * as S from './InviteModal.styles';

const InviteModal = ({
  invitedGender,
  isVisible,
  setIsVisible,
  onCloseCallback,
}: {
  invitedGender?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseCallback?: () => void;
}) => {
  const memberGender = useMemberStore((state) => state.memberInfo.memberGender);

  const closeInviteModal = async () => {
    try {
      await postInvitationRewardStatus();
      setIsVisible(false);
      if (onCloseCallback) {
        onCloseCallback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={() => setIsVisible(!isVisible)}>
      <S.BackWrapper>
        <S.Wrapper>
          <CustomText font="fontMedium" margin="0 0 6px">
            {invitedGender ? '친구가 가입에 성공했어요!' : '가입을 축하합니다!'}
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            {invitedGender ? '친구를 초대해 주셔서 감사해요' : '무료 책갈피로 매칭을 시작해 보세요!'}
          </CustomText>
          <CustomText font="fontRegular" size="12px" margin="0 0 22px">
            {invitedGender
              ? '친구를 더 초대하면 무료 책갈피를 또 받을 수 있어요 :)'
              : '친구를 초대하고 무료 책갈피를 더 받아보세요 :)'}
          </CustomText>

          <S.CoinWrapper>
            <S.ImageWrapper>
              <S.CoinImage source={icons.inviteCoin} />
            </S.ImageWrapper>
            <CustomText font="fontInviteCoin" size="24px">
              {invitedGender ? (invitedGender === 'male' ? 'X 35' : 'X 70') : memberGender === 'male' ? 'X 35' : 'X 70'}
            </CustomText>
          </S.CoinWrapper>
          <S.ButtonWrapper>
            <CustomButton contents="수령완료" onPress={closeInviteModal} />
          </S.ButtonWrapper>
        </S.Wrapper>
      </S.BackWrapper>
    </Modal>
  );
};

export default InviteModal;
