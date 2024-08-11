import { deleteAlarm } from '../../../commons/api/members/alarm/memberPushAlarm.api';

export const useDeleteAlarm = () => {
  const callDeleteAlarm = async (memberPushAlarmId?: string | null) => {
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
