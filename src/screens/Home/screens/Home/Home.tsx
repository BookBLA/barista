import { getOnboardingStatus } from '@commons/api/onboarding/onboarding.api';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import * as S from '@screens/Home/HomeStack.styles';
import { HomeOnboardingModal } from '@screens/Home/screens/Home/units/OnboardingModal/HomeOnboardingModal';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import React, { useEffect, useMemo, useState } from 'react';
import Advert from './units/Advert/Advert';
import Header from './units/Header/Header';
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const [isAlreadyEntry, setIsAlreadyEntry] = useState<boolean>(true);

  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['80%'], []);

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
        <MemberCard handleReport={reportBottomSheet.handleOpenBottomSheet} />
        <CustomText onPress={reportBottomSheet.handleOpenBottomSheet}>asdf</CustomText>

        {/* <EventCard /> */}
        {/* <InviteCard /> */}
        <Advert />
        <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
          <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} reportedMemberId={900032} />
        </CustomBottomSheetModal>
      </S.Wrapper>
    </>
  );
};

export default Home;
