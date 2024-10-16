import { postInvitationRewardStatus } from '@commons/api/modal/modal.api';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { Modal } from 'react-native';
import * as S from './InviteModal.styles';

const InviteModal = ({
  invitedType,
  invitedGender,
  isVisible,
  setIsVisible,
  onCloseCallback,
}: {
  invitedType: string;
  invitedGender?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseCallback?: () => void;
}) => {
  const memberGender = useMemberStore((state) => state.memberInfo.memberGender);

  const closeInviteModal = async () => {
    try {
      await postInvitationRewardStatus(invitedType);
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
            {invitedGender
              ? '친구가 가입에 성공했어요!'
              : invitedType === 'FESTIVAL'
                ? 'JUST 4 YOU'
                : '가입을 축하합니다!'}
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            {invitedGender
              ? '친구를 초대해 주셔서 감사해요'
              : invitedType === 'FESTIVAL'
                ? '솔로탈출 부적을 받으셨군요!'
                : '무료 책갈피로 매칭을 시작해 보세요!'}
          </CustomText>
          <CustomText font="fontRegular" size="12px" margin="0 0 22px">
            {invitedGender
              ? '친구를 더 초대하면 무료 책갈피를 또 받을 수 있어요 :)'
              : invitedType === 'FESTIVAL'
                ? '무료 책갈피로 당신만을 위한 상대를 만나보세요 :)'
                : '친구를 초대하고 무료 책갈피를 더 받아보세요 :)'}
          </CustomText>

          <S.CoinWrapper>
            <S.ImageWrapper>
              <S.CoinImage source={icons.inviteCoin} />
            </S.ImageWrapper>
            <CustomText font="fontInviteCoin" size="24px">
              {invitedGender // 초대를 한사람이냐
                ? invitedType === 'FEMALE'
                  ? 'X 70'
                  : 'X 35'
                : invitedType === 'FESTIVAL' // 초대를 당한사람이냐
                  ? 'X 105'
                  : invitedType === 'FEMALE'
                    ? 'X 70'
                    : 'X 35'}
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
