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
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';
import { IMemberData } from '@screens/Home/screens/Home/Home.types';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const { data, isLoading, refetch } = useQuery<ResponseData<MemberIntroResponse>>({
    queryKey: ['membersMatch'],
    queryFn: getMembersMatch,
  });
  const [memberData, setMemberData] = useState<IMemberData>({});
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [isAlreadyEntry, setIsAlreadyEntry] = useState<boolean>(true);
  const isMemberData = Object.keys(memberData).length > 0;

  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['80%'], []);
  const reportedMemberId = memberData?.memberBookId ?? 0;

  const handleRefresh = () => {
    refetch();
  };

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

  useEffect(() => {
    setMemberData(data?.result ?? {});
  }, [data]);

  useScreenLogger();
  useHeaderControl({
    customContent: <Header />,
  });
  usePushNotifications();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <S.Wrapper>
        {!isAlreadyEntry && <HomeOnboardingModal onClose={toggle} visible={isOpen} />}
        {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}
        {isMemberData && <MemberCard memberData={memberData} handleReport={reportBottomSheet.handleOpenBottomSheet} />}
        {!isMemberData && <EventCard />}

        {/* TODO: 매칭에서 성공 or 거절당할 경우 InviteCard 띄우기 */}
        {/* <InviteCard /> */}
        <Advert memberData={memberData} handleRefresh={handleRefresh} />
        <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
          <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} reportedMemberId={reportedMemberId} />
        </CustomBottomSheetModal>
      </S.Wrapper>
    </>
  );
};

export default Home;
