import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import BookImage from '../BookImage/BookImage';
import BookInfo from '../BookInfo/BookInfo';
import Profile from '../Profile/Profile';
import * as S from './MemberCard.styles';

const MemberCard = () => {
  const { movePage } = useMovePage();
  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const showToast = useToastStore((state) => state.showToast);
  // TODO: 추후 memberbookId, targetMemberId 값 받아서 넣기. 현재는 임시값
  const memberBookId = 2849551;
  const targetMemberId = 900032;

  const checkStudentId = () => {
    if (memberStatus === 'REJECT') {
      studentIdToggle();
    } else if (memberStatus === 'APPROVAL') {
      showToast({ content: '학생증 검토 중입니다. 잠시만 기다려주세요.' });
    } else if (memberStatus === 'COMPLETED') {
      movePage('quizStack', { memberBookId, targetMemberId })();
    }
  };
  return (
    <S.Wrapper>
      <Profile />
      <BookImage />
      <BookInfo />

      <S.SendButton onPress={() => checkStudentId()}>
        <CustomText>엽서 보내기</CustomText>
      </S.SendButton>
      <CustomModal modalConfig={studentIdModalConfig} />
    </S.Wrapper>
  );
};

export default MemberCard;
