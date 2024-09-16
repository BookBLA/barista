import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { colors } from '@commons/styles/variablesStyles';
import { EMemberStatus } from '@commons/types/memberStatus';
import * as S from '@screens/Home/HomeStack.styles';
import React from 'react';
import Advert from './units/Advert/Advert';
import Header from './units/Header/Header';
import Lock from './units/Lock/Lock';
import MemberCard from './units/MemberCard/MemberCard';

const Home = () => {
  const { isOpen, toggle } = useToggle(true);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  useAppUIManager({
    setBackgroundColor: colors.primary,
  });
  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });
  usePushNotifications();

  return (
    <>
      <S.Wrapper>
        {/* <HomeOnboardingModal onClose={toggle} visible={isOpen} /> */}
        {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}
        <MemberCard />

        {/* <EventCard /> */}
        {/* <InviteCard /> */}
        <Advert />
      </S.Wrapper>
    </>
  );
};

export default Home;
