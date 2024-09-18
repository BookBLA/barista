import { Get, Post } from '@commons/configs/axios/http.api';
import { ReloadAdmobResponse } from '@commons/api/admob/reloadAdmob.types';

export const getReloadAdmobCount = async (): Promise<ReloadAdmobResponse> => {
  const res = await Get('members/me/admob', {});
  // @ts-ignore
  return res.result;
};

export const postReloadAdmobUse = async (what: string): Promise<ReloadAdmobResponse> => {
  const res = await Post('members/me/admob', { admobType: what });
  // @ts-ignore
  return res.result;
};
