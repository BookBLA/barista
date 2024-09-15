import { Get, Post } from '@commons/configs/axios/http.api';

export const getReloadAdmobCount = async () => {
  const res = await Get('members/me/admob', {});
  // @ts-ignore
  return res.result.admobCount;
};

export const postReloadAdmobUse = () => Post('members/me/admob', {});
