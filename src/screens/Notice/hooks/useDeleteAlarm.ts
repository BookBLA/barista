import { deleteAlarm } from '../../../commons/api/memberPushAlarm.api';

export const useDeleteAlarm = () => {
  const callDeleteAlarm = async (memberPushAlarmId: string) => {
    try {
      await deleteAlarm(memberPushAlarmId ?? null);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    callDeleteAlarm,
  };
};
