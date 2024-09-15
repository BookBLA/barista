import { getAlarmSetting, postAlarmSetting } from '@commons/api/members/alarm/memberPushAlarm.api';
import { useEffect, useState } from 'react';

export const useAlarmSetting = () => {
  const [isAlarm, setIsAlarm] = useState(false);

  const fetchAlarmSetting = async () => {
    try {
      const response = await getAlarmSetting();
      const { pushAlarmEnabled } = response?.result ?? {};
      if (pushAlarmEnabled !== undefined) {
        console.log('pushAlarmEnabled', pushAlarmEnabled);
        setIsAlarm(pushAlarmEnabled);
      }
    } catch (error) {
      console.error('알람 설정을 가져오는 데 실패했습니다:', error);
    }
  };

  const updateAlarmSetting = async () => {
    try {
      const newAlarmState = !isAlarm;
      await postAlarmSetting({ pushAlarmEnabled: newAlarmState });
      setIsAlarm(newAlarmState);
    } catch (error) {
      console.error('알람 설정을 업데이트하는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchAlarmSetting();
  }, []);

  return {
    isAlarm,
    updateAlarmSetting,
  };
};
