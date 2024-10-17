import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { parseSendbirdNotification, isSendbirdNotification } from '@sendbird/uikit-utils';

const usePushNotifications = () => {
  useEffect(() => {
    alert('notification useEffect');
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // NOTE: 알림을 사용자가 탭했을 때 호출될 리스너
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      alert(JSON.stringify(data));

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data);
      }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage.data;
      alert(JSON.stringify(data));

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data);
        alert(JSON.stringify(sendbirdPayload));
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `[Sendbird] ${sendbirdPayload.channel.name}`,
            body: sendbirdPayload.message,
            data: sendbirdPayload,
          },
          trigger: null,
        });
      }
    });

    return () => {
      alert('notification return');
      Notifications.removeNotificationSubscription(responseListener);
      unsubscribe();
    };
  }, []);
};

export default usePushNotifications;
