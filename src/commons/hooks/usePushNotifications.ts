import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import useMovePage from './useMovePage';

const usePushNotifications = () => {
  const { handleReset } = useMovePage();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // const receiveNotificationListener = Notifications.addNotificationReceivedListener((notification) => {});

    // 알림을 사용자가 탭했을 때 호출될 리스너
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      handleReset('notice');
    });

    return () => {
      // Notifications.removeNotificationSubscription(receiveNotificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};

export default usePushNotifications;
