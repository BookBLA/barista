import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import * as S from '@screens/Home/HomeStack.styles';
import React from 'react';
import Advert from './units/Advert/Advert';
import Header from './units/Header/Header';
import MemberCard from './units/MemberCard/MemberCard';

const Home = () => {
  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });
  usePushNotifications();

  return (
    <>
      <S.Wrapper>
        <MemberCard />
        {/* <EventCard /> */}
        {/* <InviteCard /> */}
        <Advert />
      </S.Wrapper>
    </>
  );
};

export default Home;
