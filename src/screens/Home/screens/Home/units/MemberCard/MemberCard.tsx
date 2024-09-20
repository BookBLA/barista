import { getStudentIdImageStatusApi } from '@commons/api/members/profile/memberProfile.api';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { EStudentIdImageStatus } from '@commons/store/members/member/MemberInfo.types';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import * as S from './MemberCard.styles';
import BookImage from './units/BookImage/BookImage';
import BookInfo from './units/BookInfo/BookInfo';
import Profile from './units/Profile/Profile';

const MemberCard = ({ memberData, handleReport }: { handleReport: () => void; memberData: MemberIntroResponse }) => {
  const { movePage } = useMovePage();
  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const studentIdImageStatus = useMemberStore((state) => state.memberInfo.studentIdImageStatus);
  const { updateMemberInfo } = useMemberStore();
  const showToast = useToastStore((state) => state.showToast);

  // TODO: 추후 memberbookId, targetMemberId 값 받아서 넣기. 현재는 임시값
  const memberBookId = memberData?.memberBookId;
  const targetMemberId = memberData?.memberId;

  const checkStudentId = async () => {
    let studentIdStatusResponse;
    if (memberStatus === 'REJECTED' || memberStatus === 'APPROVAL') {
      if (!studentIdImageStatus) {
        studentIdStatusResponse = await getStudentIdStatus();
      }
      if (
        memberStatus === 'APPROVAL' &&
        (studentIdImageStatus === EStudentIdImageStatus.PENDING ||
          studentIdStatusResponse === EStudentIdImageStatus.PENDING)
      ) {
        showToast({
          content: '학생증 승인 대기 중입니다.',
        });
      } else if (
        (memberStatus === 'REJECTED' &&
          (studentIdImageStatus === EStudentIdImageStatus.DENIAL ||
            studentIdStatusResponse === EStudentIdImageStatus.DENIAL)) ||
        (memberStatus === 'APPROVAL' &&
          (studentIdImageStatus === EStudentIdImageStatus.UNREGISTER ||
            studentIdStatusResponse === EStudentIdImageStatus.UNREGISTER))
      ) {
        studentIdToggle();
      }
    } else if (memberStatus === 'COMPLETED') {
      movePage('quizStack', { memberBookId, targetMemberId })();
    }
  };

  const getStudentIdStatus = async () => {
    try {
      const response = await getStudentIdImageStatusApi();
      updateMemberInfo('studentIdImageStatus', response.result.studentIdImageStatus as string);
      return response.result.studentIdImageStatus;
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <S.Wrapper>
      <Profile handleReport={handleReport} memberData={memberData} />
      <BookImage bookImage={memberData?.bookCoverImageUrl} />
      <BookInfo memberData={memberData} />

      <S.SendButton onPress={() => checkStudentId()}>
        <CustomText>엽서 보내기</CustomText>
      </S.SendButton>
      <CustomModal modalConfig={studentIdModalConfig} />
    </S.Wrapper>
  );
};

export default MemberCard;
