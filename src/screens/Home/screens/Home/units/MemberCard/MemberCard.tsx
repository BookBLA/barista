import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import { useStudentIdStatus } from '@commons/hooks/datas/studentIdStatus/useStudentIdStatus';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useApprovalStatus } from '@commons/hooks/ui/approvalStatus/useApprovalStatus';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';
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
  const showToast = useToastStore((state) => state.showToast);
  const { getStudentIdStatus } = useStudentIdStatus();
  const { handleApprovalStatus } = useApprovalStatus();

  // MemberData
  // const memberBookId = 2849765;
  // const targetMemberId = 900231;
  const memberBookId = memberData?.memberBookId;
  const targetMemberId = memberData?.memberId;

  const handleMemberStatus = async () => {
    try {
      let studentStatus = null;
      if (memberStatus === EMemberStatus.REJECTED || memberStatus === EMemberStatus.APPROVAL) {
        // NOTE: 학생증 인증 정보 상태의 무결성을 위해 API 매번 호출
        studentStatus = await getStudentIdStatus();
      }

      switch (memberStatus) {
        case EMemberStatus.REJECTED:
          studentIdToggle();
          break;

        case EMemberStatus.APPROVAL:
          handleApprovalStatus(studentStatus || '', studentIdToggle);
          break;

        case EMemberStatus.COMPLETED:
          movePage('quizStack', { memberBookId, targetMemberId })();
          break;

        case EMemberStatus.REPORTED:
          showToast({
            content: '신고가 3회 이상 누적되어 매칭이 불가능합니다',
          });
          break;

        case EMemberStatus.MATCHING_DISABLED:
          showToast({
            content: '매칭을 거부한 상태입니다',
          });
          break;

        case EMemberStatus.PROFILE:
        case EMemberStatus.STYLE:
        case EMemberStatus.BOOK:
          showToast({
            content: '프로필 작성을 마치고 시도해주세요.',
          });
          break;

        default:
          showToast({
            content: '잠시 후에 다시 시도해주세요',
          });
          break;
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <S.Wrapper>
      <Profile handleReport={handleReport} memberData={memberData} />
      <BookImage bookImage={memberData?.bookCoverImageUrl ?? ''} />
      <BookInfo memberData={memberData} />

      <S.SendButton onPress={() => handleMemberStatus()}>
        <CustomText>엽서 보내기</CustomText>
      </S.SendButton>
      <CustomModal modalConfig={studentIdModalConfig} />
    </S.Wrapper>
  );
};

export default MemberCard;
