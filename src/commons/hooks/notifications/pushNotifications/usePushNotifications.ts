import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import messaging from '@react-native-firebase/messaging';
import { parseSendbirdNotification, isSendbirdNotification } from '@sendbird/uikit-utils';
import { Platform } from 'react-native';

const usePushNotifications = () => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      const { data } = remoteMessage; // 메시지 데이터에서 'data' 부분 추출

      if (isSendbirdNotification(data)) {
        const sendbirdPayload = parseSendbirdNotification(data); // 'sendbird' 데이터 파싱

        console.log('Parsed Sendbird Notification: ', sendbirdPayload);

        // 백그라운드에서 알림 표시
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${sendbirdPayload.channel.name} 새로운 메시지}`, // 알림 제목
            body: sendbirdPayload.message, // 알림 본문
            data: sendbirdPayload, // 알림의 추가 데이터
          },
          trigger: null, // 즉시 알림을 띄움
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

    if (Platform.OS === 'android') {
      // Set channel
      const channelId = 'default';
      Notifications.setNotificationChannelAsync(channelId, {
        name: 'Default Channel',
        importance: 4,
      });

      // Set background message handler
      const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';
      TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({data}) => {
        if (Platform.OS !== 'android') return;

        console.log('Background notification task', data);

        if (isSendbirdNotification(data)) {
          const sendbird = parseSendbirdNotification(data);
          console.log('sendbird', sendbird);

          Notifications.scheduleNotificationAsync({
            identifier: String(sendbird.message_id),
            content: {
              title: `[RN]${sendbird.channel.name || sendbird.sender?.name || 'Message received'}`,
              body: sendbird.message,
              data: data,
            },
            trigger: null,
          });
        }
      });
      Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    }

    return () => {
      alert('notification return');
      Notifications.removeNotificationSubscription(responseListener);
      unsubscribe();
    };
  }, []);
};

export default usePushNotifications;
