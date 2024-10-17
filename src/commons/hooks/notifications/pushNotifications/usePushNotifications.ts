import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { isSendbirdNotification, parseSendbirdNotification } from '@sendbird/uikit-utils';
import { useEffect } from 'react';

const usePushNotifications = () => {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    const onNotification = (notification: Notifications.NotificationResponse) => {
      const data = notification?.notification?.request?.content?.data as any;
      if (data && isSendbirdNotification(data)) {
        const sendbird = parseSendbirdNotification(data);
        // 채널 이동 등의 동작을 추가할 수 있음
        console.log('Sendbird notification received in foreground:', sendbird);
      }
    };

    // 앱이 열릴 때 마지막으로 수신한 알림 확인
    const checkAppOpenedWithNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        onNotification(response);
      }
    };

    const foregroundSubscription = Notifications.addNotificationResponseReceivedListener(onNotification);
    checkAppOpenedWithNotification();

    if (Platform.OS === 'android') {
      // Set channel
      const channelId = 'default';
      Notifications.setNotificationChannelAsync(channelId, {
        name: 'Default Channel',
        importance: 4,
      });

      // Set background message handler
      const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';
      TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data }) => {
        if (Platform.OS !== 'android') return;

        console.log('Background notification task', data);

        if (isSendbirdNotification(data)) {
          const sendbird = parseSendbirdNotification(data);

          Notifications.scheduleNotificationAsync({
            identifier: String(sendbird.message_id),
            content: {
              title: `[RN]${sendbird.channel.name || sendbird.sender?.name || 'Message received'}`,
              body: sendbird.message,
              data,
            },
            trigger: null,
          });
        }
      });
      Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    }

    return () => {
      foregroundSubscription.remove();
    };
  }, []);
};

export default usePushNotifications;
