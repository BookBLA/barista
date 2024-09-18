import { Delete, Get, Post } from '@commons/configs/axios/http.api';
import {
  MemberPushAlarmReadResponse,
  PushAlarmSettingCreateRequest,
  PushAlarmSettingResponse,
} from '@commons/types/openapiGenerator';

export const getAlarms = () => Get<MemberPushAlarmReadResponse>(`members/push-alarms`);

export const deleteAlarm = (memberPushAlarmId?: string | null) => {
  let url = `members/push-alarms`;
  if (memberPushAlarmId) {
    url += `/${memberPushAlarmId}`;
  }
  return Delete(url);
};

export const getAlarmSetting = () => Get<PushAlarmSettingResponse>(`members/push-alarms/settings`);

export const postAlarmSetting = (contents: PushAlarmSettingCreateRequest) =>
  Post<PushAlarmSettingResponse>(`members/push-alarms/settings`, contents);
