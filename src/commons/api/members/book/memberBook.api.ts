import { Delete, Get, Post, Put } from '@commons/configs/axios/http.api';

export interface IContents {
  title?: string | undefined;
  authors?: string | undefined;
  isbn?: string | undefined;
  imageUrl?: string | undefined;
  thumbnail: string;
}

export const getMemberBookApi = (memberBookId = '') => Get(`member-books/${memberBookId}`);

export const postMemberBookApi = (contents: IContents) => Post('member-books', contents);

export const putMemberBookApi = (contents: string) => Put('member-books', { contents });

export const deleteMemberBookApi = (memberBookId: string) => Delete(`member-books/${memberBookId}`);
