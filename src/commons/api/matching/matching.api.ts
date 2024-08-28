import { Get, Post } from '@commons/configs/axios/http.api';
import { IReceivePostcardProps } from '@screens/Matching/Postcard/Receive/ReceivePostcard.types';
import { ISendPostcardProps, IUpdatePostcardRequest } from '@screens/Matching/Postcard/Send/SendPostcard.types';

export const getReceivePostcardList = async () => {
  const { result } = await Get('postcard/to', {}, true);
  return result as IReceivePostcardProps[];
};

export const getSendPostcardList = async () => {
  const { result } = await Get('postcard/from', {}, true);
  return result as ISendPostcardProps[];
};

export const readPostcard = async (postcardId: number) => Post(`postcard/read/${postcardId}`);

export const postPostcardStatusUpdate = (contents: IUpdatePostcardRequest) => Post(`postcard/status`, contents, true);
