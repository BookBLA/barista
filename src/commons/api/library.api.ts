import { Delete, Get, Put } from '../utils/http.api';
import { TBookInfo, TBookQuizInfo } from '../../screens/Library/MyBookInfoModify/MyBookInfoModify.types';

export const getMyLibraryInfo = () => Get('members/library', {}, true);

export const getYourLibraryInfo = (targetMemberId: number) => Get('members/library/target', { targetMemberId }, true);

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
  review: string;
  quiz: string;
  quizAnswer: string;
  firstWrongChoice: string;
  secondWrongChoice: string;
};

export const updateBookInfo = async ({ memberBookId, ...data }: updateBookInfo) => {
  await Put(`quizzes/${memberBookId}`, data);
};

export const deleteBook = async (memberBookId: number) => {
  console.log('삭제');
  await Delete(`member-books/${memberBookId}`);
};
