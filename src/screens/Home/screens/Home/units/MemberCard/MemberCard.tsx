import { useState } from 'react';
import { getStudentIdImageStatusApi } from '@commons/api/members/profile/memberProfile.api';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { EStudentIdImageStatus } from '@commons/store/members/member/MemberInfo.types';
import { EMemberStatus } from '@commons/types/memberStatus';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import * as S from './MemberCard.styles';
import BookImage from './units/BookImage/BookImage';
import BookInfo from './units/BookInfo/BookInfo';
import Profile from './units/Profile/Profile';
import { getMemberApi } from '@commons/api/members/default/member.api';

const MemberCard = ({ memberData, handleReport }: { handleReport: () => void; memberData: MemberIntroResponse }) => {
  const { movePage } = useMovePage();
  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });
  let memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const studentIdImageStatus = useMemberStore((state) => state.memberInfo.studentIdImageStatus);
  const { updateMemberInfo } = useMemberStore();
  const [, forceRender] = useState(0); // 더미 상태로 렌더링을 강제로 유도
  const showToast = useToastStore((state) => state.showToast);

  if (!memberStatus) {
    getMemberApi().then((result) => {
      memberStatus = result.result.memberStatus ?? '';
    });
  }

  // MemberData
  // const memberBookId = 2849765;
  // const targetMemberId = 900231;
  const memberBookId = memberData?.memberBookId;
  const targetMemberId = memberData?.memberId;

  const handleMemberStatus = async () => {
    if (memberStatus === EMemberStatus.REJECTED || memberStatus === EMemberStatus.APPROVAL) {
      if (!studentIdImageStatus) {
        await getStudentIdStatus();
      }
    }

    switch (memberStatus) {
      case EMemberStatus.REJECTED:
        studentIdToggle();
        break;

      case EMemberStatus.APPROVAL:
        handleApprovalStatus();
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
  };

  const handleApprovalStatus = () => {
    if (studentIdImageStatus === EStudentIdImageStatus.PENDING) {
      showToast({
        content: '학생증 승인 대기 중입니다.',
      });
    } else if (
      studentIdImageStatus === EStudentIdImageStatus.UNREGISTER ||
      studentIdImageStatus === EStudentIdImageStatus.DENIAL
    ) {
      studentIdToggle();
    } else {
      movePage('quizStack', { memberBookId, targetMemberId })();
    }
  };

  const getStudentIdStatus = async () => {
    try {
      const response = await getStudentIdImageStatusApi();
      updateMemberInfo('studentIdImageStatus', response.result.studentIdImageStatus as string);
      forceRender((prev) => prev + 1);
    } catch (error) {
      console.log('error', error);
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
