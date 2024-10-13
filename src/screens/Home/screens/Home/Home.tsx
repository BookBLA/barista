import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
import { IMemberData } from '@screens/Home/screens/Home/Home.types';
import InviteCard from '@screens/Home/screens/Home/units/InviteCard/InviteCard';
import Spinner from '@commons/components/Layouts/Spinner/Spinner';

import Advert from './units/Advert/Advert';
import EventCard from './units/EventCard/EventCard';
import Header from './units/Header/Header';
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';
import InviteModal from './units/InviteModal/InviteModal';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const [invitingModalOpen, setInvitingModalOpen] = useState<boolean>(false);
  const [invitedModalOpen, setInvitedModalOpen] = useState<boolean>(false);
  const [invitedMembersGender, setInvitedMembersGender] = useState<string | null>('male');
  const [modalStatus, setModalStatus] = useState<{
    isAlreadyEntry: boolean;
    invitedRewardStatus: string;
    invitingRewardStatus: boolean;
  }>({
    isAlreadyEntry: true,
    invitedRewardStatus: 'NONE',
    invitingRewardStatus: false,
  });

  // GET /members-match
  const { data, isLoading, refetch } = useQuery<ResponseData<MemberIntroResponse>>({
    queryKey: ['membersMatch'],
    queryFn: getMembersMatch,
  });
  const [isInvitationCard, setIsInvitationCard] = useState<boolean>(true);
  const [memberData, setMemberData] = useState<IMemberData>({});
  const [isReported, setIsReported] = useState(false);
  const memberStore = useMemberStore((state) => state.memberInfo);
  const memberStatus = memberStore.memberStatus;
  const isMemberData = Object.keys(memberData).length > 0 && memberData && memberData.memberId;

  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['75%'], []);
  const reportedMemberId = memberData?.memberId ?? 0;

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        // TODO - 한결: asyncStorage 사용하여 저장해놓기
        const res = await getOnboardingStatus();
        const response = await getInvitationRewardStatus();
        setModalStatus({
          isAlreadyEntry: res.result.homeOnboardingStatus ?? true,
          invitedRewardStatus: response.result.invitedRewardStatus ?? 'NONE',
          invitingRewardStatus: response.result.invitingRewardStatus ?? false,
        });
        setInvitedMembersGender(response.result.invitedMembersGender ? response.result.invitedMembersGender : null);
        if (res.result.homeOnboardingStatus === true) {
          if (response.result.invitedRewardStatus !== 'NONE') {
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

  useEffect(() => {
    setIsInvitationCard(data?.result.isInvitationCard ?? false);
    setMemberData(data?.result ?? {});
  }, [data]);

  useScreenLogger();
  useHeaderControl({
    customContent: <Header />,
  });
  usePushNotifications();

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const closeHomeOnboardingModal = async () => {
    toggle();
    await delay(500);

    if (modalStatus.invitedRewardStatus !== 'NONE') {
      setInvitedModalOpen(true);
    } else if (modalStatus.invitingRewardStatus) {
      setInvitingModalOpen(true);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <S.Wrapper>
        {!modalStatus.isAlreadyEntry && <HomeOnboardingModal onClose={closeHomeOnboardingModal} visible={isOpen} />}
        {modalStatus.invitedRewardStatus !== 'NONE' && (
          <InviteModal
            key="invited-modal"
            invitedType={modalStatus.invitedRewardStatus}
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

        {isInvitationCard || isReported ? (
          <InviteCard />
        ) : (
          <>
            {isMemberData ? (
              <MemberCard memberData={memberData} handleReport={reportBottomSheet.handleOpenBottomSheet} />
            ) : (
              <EventCard />
            )}
          </>
        )}

        <Advert memberData={memberData} handleRefresh={refetch} />
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
