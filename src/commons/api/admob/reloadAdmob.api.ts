import { Get, Post } from '@commons/configs/axios/http.api';

export const getReloadAdmobCount = async (what: string) => {
  const res = await Get('members/me/admob', {});
  // @ts-ignore
  return res.result.admobCount;
};

export const postReloadAdmobUse = async (what: string) => {
  const res = await Post('members/me/admob', {});
  // @ts-ignore
  return res.result.admobCount;
};
