import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import BookImage from '../BookImage/BookImage';
import BookInfo from '../BookInfo/BookInfo';
import Profile from '../Profile/Profile';
import * as S from './MemberCard.styles';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';

const MemberCard = () => {
  const { movePage } = useMovePage();
  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });
  // TODO: 추후 memberbookId, targetMemberId 값 받아서 넣기. 현재는 임시값
  const memberBookId = 2849551;
  const targetMemberId = 900032;

  return (
    <S.Wrapper>
      <Profile />
      <BookImage />
      <BookInfo />

      <S.SendButton onPress={movePage('quizStack', { memberBookId, targetMemberId })}>
        <CustomText>엽서 보내기</CustomText>
      </S.SendButton>
      <CustomModal modalConfig={studentIdModalConfig} />
    </S.Wrapper>
  );
};

export default MemberCard;
