import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const usePushNotifications = () => {
  const { sdk } = useSendbirdChat();
  // const initializeSendbirdPushNotification = async () => {
  //   if (Platform.OS === 'ios') {
  //     const token = await messaging().getAPNSToken();
  //     await sdk.registerAPNSPushTokenForCurrentUser(token ?? '');
  //   } else {
  //     const token = await messaging().getToken();
  //     await sdk.registerFCMPushTokenForCurrentUser(token);
  //   }
  // };
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    // initializeSendbirdPushNotification().then(() => {
    //   console.debug('sendbird notification setting complete');
    // });

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
