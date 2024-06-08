import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import useMovePage from './useMovePage';

const usePushNotifications = () => {
  // const { handleReset } = useMovePage();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // NOTE: 알림을 사용자가 탭했을 때 호출될 리스너
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      // TODO: 백그라운드 상태 로직과 포그라운드 상태 로직 구현 필요
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};

export default usePushNotifications;
