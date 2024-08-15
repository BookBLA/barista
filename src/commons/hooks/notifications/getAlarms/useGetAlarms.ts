import { getAlarms } from '@commons/api/members/alarm/memberPushAlarm.api';
import { useEffect, useState } from 'react';

export interface IAlarmData {
  memberPushAlarmId: number;
  title: string;
  body: string;
  createdAt: string;
}

export const useGetAlarms = () => {
  const [data, setData] = useState<IAlarmData[]>([]);
  const fetchAlarms = async () => {
    try {
      const { result } = await getAlarms();
      setData(result.pushAlarmInfos);
    } catch (err) {
      console.error(err);
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
