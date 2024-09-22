import { getMembersMatch } from '@commons/api/members/match/memberMatch';
import { getOnboardingStatus } from '@commons/api/onboarding/onboarding.api';
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
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const { data, isLoading } = useQuery<ResponseData<MemberIntroResponse[]>>({
    queryKey: ['membersMatch'],
    queryFn: getMembersMatch,
  });
  const memberData = data?.result ?? [];
  const [memberCount, setMemberCount] = useState(0);
  const [isReported, setIsReported] = useState(false);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [isAlreadyEntry, setIsAlreadyEntry] = useState<boolean>(true);
  const isMemberData = memberData?.length > 0;

  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['75%'], []);
  const reportedMemberId = memberData[memberCount]?.memberId ?? 0;

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const res = await getOnboardingStatus();
        // @ts-ignore
        setIsAlreadyEntry(res.result.homeOnboardingStatus);
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

  return (
    <>
      <S.Wrapper>
        {!isAlreadyEntry && <HomeOnboardingModal onClose={toggle} visible={isOpen} />}
        {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}
        {!isLoading && isMemberData && !isReported && (
          <MemberCard memberData={memberData[memberCount]} handleReport={reportBottomSheet.handleOpenBottomSheet} />
        )}
        {!isLoading && !isMemberData && <EventCard />}
        {!isLoading && isReported && <InviteCard />}

        {/* <InviteCard /> */}
        {!isLoading && <Advert />}
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
