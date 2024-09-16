import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import * as S from '@screens/Home/HomeStack.styles';
import React, { useEffect, useState } from 'react';
import Advert from './units/Advert/Advert';
import Header from './units/Header/Header';
import MemberCard from './units/MemberCard/MemberCard';
import { HomeOnboardingModal } from '@screens/Home/screens/Home/units/OnboardingModal/HomeOnboardingModal';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { getOnboardingStatus } from '@commons/api/onboarding/onboarding.api';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const [isAlreadyEntry, setIsAlreadyEntry] = useState<boolean>(true);

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
    free: <Header />,
  });
  usePushNotifications();

  return (
    <>
      <S.Wrapper>
        {!isAlreadyEntry && <HomeOnboardingModal onClose={toggle} visible={isOpen} />}

        <MemberCard />
        {/* <EventCard /> */}
        {/* <InviteCard /> */}
        <Advert />
      </S.Wrapper>
    </>
  );
};

export default Home;
