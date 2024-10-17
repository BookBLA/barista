import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { parseSendbirdNotification, isSendbirdNotification } from '@sendbird/uikit-utils';
import { Platform } from 'react-native';

const usePushNotifications = () => {
  if (Platform.OS === 'android') {
    const channelId = `${process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}`;
    Notifications.setNotificationChannelAsync(channelId, {
      name: 'Sendbird Notification',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const { data } = remoteMessage; // 메시지 데이터에서 'data' 부분 추출

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data); // 'sendbird' 데이터 파싱

        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${sendbirdPayload.sender?.name}님의 새 메시지`,
            body: sendbirdPayload.message,
            data: sendbirdPayload,
          },
          trigger: null,
        });
      }
    });

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

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data);
      }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage.data;

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${sendbirdPayload.sender?.name}님의 새 메시지`,
            body: sendbirdPayload.message,
            data: sendbirdPayload,
          },
          trigger: null,
        });
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
      unsubscribe();
    };
  }, []);
};

export default usePushNotifications;
