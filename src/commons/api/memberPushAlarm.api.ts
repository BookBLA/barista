import { Delete, Get } from '../utils/http.api';

export const getAlarms = () => Get(`members/push-alarms`);

export const deleteAlarm = (memberPushAlarmId?: string | null) => {
  let url = `members/push-alarms`;
  if (memberPushAlarmId) {
    url += `/${memberPushAlarmId}`;
  }
  return Delete(url);
};
