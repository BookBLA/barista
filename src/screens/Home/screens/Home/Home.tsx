import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import * as S from '@screens/Home/HomeStack.styles';
import React from 'react';
import Advert from './units/Advert/Advert';
import Header from './units/Header/Header';
import MemberCard from './units/MemberCard/MemberCard';
import { OnboardingModal } from '@screens/Home/screens/Home/units/OnboardingModal/OnboardingModal';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { View } from 'react-native';

const Home = () => {
  const { toggle, isOpen } = useToggle();

  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });
  usePushNotifications();

  return (
    <>
      <S.Wrapper>
        <View style={{ height: '50%' }}>
          <OnboardingModal onClose={toggle} visible={true} />
        </View>

        <MemberCard />
        {/* <EventCard /> */}
        {/* <InviteCard /> */}
        <Advert />
      </S.Wrapper>
    </>
  );
};

export default Home;
