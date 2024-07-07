import { useCallback } from 'react';
import analytics from '@react-native-firebase/analytics';
import { useUserStore } from '../store/useUserinfo';

const useAnalyticsEventLogger = () => {
  const { userInfo } = useUserStore();

  return useCallback(async (eventName: string, eventParams: { [key: string]: any } = {}) => {
    try {
      await analytics().logEvent(eventName, { ...eventParams, ...userInfo, user_id: userInfo.memberId });
      console.log(`log_event ${eventName} log`);
    } catch (error) {
      console.error(`Failed to log event: ${eventName}`, error);
    }
  }, []);
};

export default useAnalyticsEventLogger;
