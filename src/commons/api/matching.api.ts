import { Get, Patch, Post } from '../utils/http.api';
import { IReceivePostcardProps } from '../../screens/Matching/Postcard/Receive/ReceivePostcard.types';
import { ISendPostcardProps, IUpdatePostcardRequest } from '../../screens/Matching/Postcard/Send/SendPostcard.types';

export const getReceivePostcardList = async () => {
  const { responses } = await Get('postcard/to', {}, true);
  console.log('뎅터', responses);
  return responses as IReceivePostcardProps[];
};

export const getSendPostcardList = async () => {
  const { result } = await Get('postcard/from', {}, true);
  return result as ISendPostcardProps[];
};

export const patchPostcardDecrease = async (payType: string) => Patch(`postcard/${payType}`);

export const postPostcardStatusUpdate = (postcardId: number, contents: IUpdatePostcardRequest) =>
  Post(`postcard/status/${postcardId}`, contents, true);
