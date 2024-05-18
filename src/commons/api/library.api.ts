import { Delete, Get, Patch } from '../utils/http.api';
import { TBookInfo, TBookQuizInfo } from '../../screens/Library/MyBookInfoModify/MyBookInfoModify.types';

export const getMyLibraryInfo = () => Get('members/library', {}, true);

export const getYourLibraryInfo = async (targetMemberId: number) => {
  const {
    result: { baseResponse },
  } = await Get(`members/library/target/${Number(targetMemberId)}`, true);

  return baseResponse;
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
  return result as TBookInfo;
};

type updateBookInfo = {
  memberBookId: number;
  quiz: string;
  quizAnswer: string;
  firstWrongChoice: string;
  secondWrongChoice: string;
};

type updateBookReview = {
  memberBookId: number;
  contents: string;
};

export const updateQuiz = async ({ memberBookId, ...data }: updateBookInfo) => {
  await Patch(`member-books/${memberBookId}/quiz`, data);
};

export const updateBookReview = async ({ memberBookId, ...data }: updateBookReview) => {
  await Patch(`member-books/${memberBookId}/review`, data);
};

export const deleteBook = async (memberBookId: number) => {
  console.log('삭제');
  await Delete(`member-books/${memberBookId}`);
};
