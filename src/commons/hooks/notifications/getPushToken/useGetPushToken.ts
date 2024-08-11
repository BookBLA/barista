import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import useToastStore from '../../../store/ui/toast/useToastStore';

const useGetPushToken = () => {
  const showToast = useToastStore((state) => state.showToast);

  const getPushToken = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let pushToken = '';
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      showToast({
        content: `status: ${status}`,
      });
      finalStatus = status;
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      showToast({
        content: `프로젝트 Id가 없습니다`,
      });
    }

    if (finalStatus === 'granted') {
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        pushToken = token.data;
      } catch (err) {
        showToast({
          content: `푸시토큰 발급에 실패하였습니다.`,
        });
      }
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'notfication_sound.wav',
      });
    }
    return pushToken;
  };

  return { getPushToken };
};

export default useGetPushToken;
