import { Delete, Get } from '@commons/configs/axios/http.api';
import { MemberPushAlarmReadResponse } from '@commons/types/openapiGenerator';

export const getAlarms = () => Get<MemberPushAlarmReadResponse>(`members/push-alarms`);

export const deleteAlarm = (memberPushAlarmId?: string | null) => {
  let url = `members/push-alarms`;
  if (memberPushAlarmId) {
    url += `/${memberPushAlarmId}`;
  }
  return Delete(url);
};
