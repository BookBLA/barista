import { Delete, Get, Post, Put } from '../utils/http.api';

export interface IContents {
  isRepresentative: true;
  title: string;
  authors: string[];
  isbn: string;
  thumbnail: string;
}

export const getMemberBookApi = (memberBookId = '') => Get(`member-books/${memberBookId}`);

export const postMemberBookApi = (contents: IContents) => Post('member-books', contents);

export const putMemberBookApi = (contents: string) => Put('member-books', { contents });

export const deleteMemberBookApi = (memberBookId: string) => Delete(`member-books/${memberBookId}`);
