import { Delete, Get, Patch, Post } from '@commons/configs/axios/http.api';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import { TUpdateBookInfo, TUpdateBookReview, TValidatePostcardStatus } from '@screens/Library/Library.types';
import {
  TBookInfo,
  TBookQuizInfo,
  TInvitationCode,
  TMemberStyleInfo,
} from '@screens/Library/MyBookInfoModify/MyBookInfoModify.types';
import { ISendPostcardRequest, TPostcardInfo } from '@screens/Library/SendPostcardModal/SendPostcardModal.types';

export const getMyLibraryInfo = () => Get('library', {}, true);

export const getYourLibraryInfo = async (targetMemberId: number) => {
  const {
    result: { baseResponse },
  } = await Get(`library/target/${Number(targetMemberId)}`, true);

  return {
    result: baseResponse,
  };
};

export const getBookQuizInfo = async (memberBookId: number) => {
  const { result } = await Get(`quizzes/${memberBookId}`);
  return {
    ...result,
    memberBookId,
  } as TBookQuizInfo;
};

export const getBookInfo = async (memberBookId: number) => {
  const { result } = await Get(`member-books/${memberBookId}`);
  return {
    ...result,
    memberBookId,
  } as TBookInfo;
};

export const getMemberStyle = async (targetMemberId: number) => {
  const { result } = await Get(`members/styles/${targetMemberId}`);
  return result as TMemberStyleInfo;
};

export const getInvitationCode = async () => {
  const { result } = await Get(`invitation-code`);
  return result as TInvitationCode;
};

export const validateSendPostcard = async (targetMemberId: number) => {
  try {
    const { result } = await Post(`postcard/send/validation`, { targetMemberId });

    return { isRefused: result.isRefused, isSuccess: true } as TValidatePostcardStatus;
  } catch (error) {
    if (!isAxiosErrorResponse(error)) return;
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
