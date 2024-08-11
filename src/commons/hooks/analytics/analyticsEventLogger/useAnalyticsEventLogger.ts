import { useCallback } from 'react';
import analytics from '@react-native-firebase/analytics';
import useMemberStore from '../../../store/useMemberStore';

const useAnalyticsEventLogger = () => {
  const { id, oauthEmail, memberType, memberStatus, memberGender } = useMemberStore((state) => state.memberInfo);

  return useCallback(async (eventName: string, eventParams: { [key: string]: any } = {}) => {
    try {
      await analytics().logEvent(eventName, {
        ...eventParams,
        user_id: String(id),
        type: String(memberType),
        status: String(memberStatus),
        gender: String(memberGender),
      });
      console.debug(
        `Logged Event ${JSON.stringify({
          ...eventParams,
          user_id: String(id),
          type: String(memberType),
          status: String(memberStatus),
          gender: String(memberGender),
        })}`,
      );
    } catch (error) {
      console.error(`Failed to log event: ${eventName}`, error);
    }
  }, []);
};

export default useAnalyticsEventLogger;
