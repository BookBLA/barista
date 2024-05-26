import { Delete, Get, Patch, Post } from '../utils/http.api';
import { TUpdateBookInfo, TUpdateBookReview, TValidatePostcardStatus } from '../../screens/Library/Library.types';
import { ISendPostcardRequest, TPostcardInfo } from '../../screens/Library/SendPostcardModal/SendPostcardModal.types';
import { IReceivePostcardProps } from '../../screens/Matching/Postcard/Receive/ReceivePostcard.types';
import { ISendPostcardProps } from '../../screens/Matching/Postcard/Send/SendPostcard.types';

export const getReceivePostcardList = async () => {
  const { result } = await Get('postcard/to', {}, true);
  return result as IReceivePostcardProps[];
};

export const getSendPostcardList = async () => {
  const { result } = await Get('postcard/from', {}, true);
  return result as ISendPostcardProps[];
};

export const patchPostcardDecrease = async (payType: string) => Patch(`postcard/${payType}`);

export const validateSendPostcard = async (targetMemberId: number) => {
  try {
    const { result } = await Post(`postcard/send/validation`, { targetMemberId });

    return { isRefused: result.isRefused, isSuccess: true } as TValidatePostcardStatus;
  } catch (error: any) {
    if (error.response.data.code === 'postcard-003' || error.response.data.code === 'postcard-005') {
      return {
        isSuccess: false,
        rejectMessage: '현재 매칭 상대의 답장을 기다리는 중입니다.',
      } as TValidatePostcardStatus;
    }

    if (error.response.data.code === 'postcard-004') {
      return {
        isSuccess: false,
        rejectMessage: '이전에 매칭된 상대에게는 보낼 수 없습니다',
      } as TValidatePostcardStatus;
    }
  }
};

export const getPostcardTypeList = async () => {
  const { result: postcardTypeList } = await Get(`postcard/type-list`);
  return postcardTypeList.postcardTypeList as TPostcardInfo[];
};

export const updateQuiz = async ({ memberBookId, ...data }: TUpdateBookInfo) => {
  await Patch(`member-books/${memberBookId}/quiz`, data);
};

export const updateBookReview = async ({ memberBookId, ...data }: TUpdateBookReview) => {
  await Patch(`member-books/${memberBookId}/review`, data);
};

export const deleteBook = async (memberBookId: number) => {
  await Delete(`member-books/${memberBookId}`);
};

export const postPostcard = (contents: ISendPostcardRequest) => Post('postcard/send', contents, true);
