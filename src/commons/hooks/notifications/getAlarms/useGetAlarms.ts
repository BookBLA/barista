import { getAlarms } from '@commons/api/members/alarm/memberPushAlarm.api';
import { PushAlarmInfo } from '@commons/types/openapiGenerator';
import { useEffect, useState } from 'react';

export const useGetAlarms = () => {
  const [data, setData] = useState<PushAlarmInfo[]>([]);
  const fetchAlarms = async () => {
    try {
      const { result } = await getAlarms();
      setData(result?.pushAlarmInfos ?? []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  return {
    data,
    setData,
  };
};
