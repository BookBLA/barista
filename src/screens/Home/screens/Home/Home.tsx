import { getMembersMatch } from '@commons/api/members/match/memberMatch';
import { getInvitationRewardStatus, getOnboardingStatus } from '@commons/api/modal/modal.api';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { ResponseData } from '@commons/types/responseData';
import * as S from '@screens/Home/screens/Home/Home.styles';
import { HomeOnboardingModal } from '@screens/Home/screens/Home/units/OnboardingModal/HomeOnboardingModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import Advert from './units/Advert/Advert';
import EventCard from './units/EventCard/EventCard';
import Header from './units/Header/Header';
import InviteCard from './units/InviteCard/InviteCard';
import InviteModal from './units/InviteModal/InviteModal';
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const [invitingModalOpen, setInvitingModalOpen] = useState<boolean>(false);
  const [invitedModalOpen, setInvitedModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useQuery<ResponseData<MemberIntroResponse>>({
    queryKey: ['membersMatch'],
    queryFn: getMembersMatch,
  });
  const memberData = data?.result ?? {};
  const [isReported, setIsReported] = useState(false);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [modalStatus, setModalStatus] = useState<{ [key: string]: boolean }>({
    isAlreadyEntry: true,
    invitedRewardStatus: true,
    invitingRewardStatus: true,
  });
  const [invitedMembersGender, setInvitedMembersGender] = useState<string | null>('male');

  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['78%'], []);
  const reportedMemberId = memberData.memberId ?? 0;

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const res = await getOnboardingStatus();
        const response = await getInvitationRewardStatus();
        setModalStatus({
          isAlreadyEntry: res.result.homeOnboardingStatus || true,
          invitingRewardStatus: response.result.invitingRewardStatus || false,
          invitedRewardStatus: response.result.invitingRewardStatus || false,
        });
        setInvitedMembersGender(response.result.invitedMembersGender ? response.result.invitedMembersGender : null);
        if (res.result.homeOnboardingStatus === true) {
          if (response.result.invitedRewardStatus === true) {
            setInvitedModalOpen(true);
          } else {
            setInvitingModalOpen(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      }
    };
    fetchOnboardingStatus();
  }, []);

  useScreenLogger();
  useHeaderControl({
    customContent: <Header />,
  });
  usePushNotifications();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const closeHomeOnboardingModal = async () => {
    toggle();
    await delay(500);

    if (modalStatus.invitedRewardStatus) {
      setInvitedModalOpen(true);
    } else if (modalStatus.invitingRewardStatus) {
      setInvitingModalOpen(true);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <S.Wrapper>
        {!modalStatus.isAlreadyEntry && <HomeOnboardingModal onClose={closeHomeOnboardingModal} visible={isOpen} />}
        {modalStatus.invitedRewardStatus && (
          <InviteModal
            key="invited-modal"
            isVisible={invitedModalOpen}
            setIsVisible={setInvitedModalOpen}
            onCloseCallback={modalStatus.invitingRewardStatus ? () => setInvitingModalOpen(true) : undefined}
          />
        )}
        {modalStatus.invitingRewardStatus && (
          <InviteModal
            key="inviting-modal"
            invitedGender={invitedMembersGender ? invitedMembersGender : undefined}
            isVisible={invitingModalOpen}
            setIsVisible={setInvitingModalOpen}
          />
        )}
        {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}

        {isReported && <InviteCard />}
        {memberData && !isReported && (
          <MemberCard memberData={memberData} handleReport={reportBottomSheet.handleOpenBottomSheet} />
        )}
        {!memberData && <EventCard />}

        {/* <InviteCard /> */}
        <Advert />
        <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
          <ReportOption
            bottomClose={reportBottomSheet.handleCloseBottomSheet}
            reportedMemberId={reportedMemberId}
            setIsReported={setIsReported}
          />
        </CustomBottomSheetModal>
      </S.Wrapper>
    </>
  );
};

export default Home;
