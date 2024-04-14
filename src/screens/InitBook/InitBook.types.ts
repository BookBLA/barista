import { RouteProp } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  AddBook: { isModify: boolean };
};

export type AddBookRouteProp = RouteProp<RootStackParamList, 'AddBook'>;

export type Props = {
  route: AddBookRouteProp;
};

export interface ISearchBooksData {
  totalCount: number;
  page: number;
  isEnd: boolean;
  bookSearchResponses: IBookData[];
}

export interface IBookData {
  title: string;
  authors: string[];
  isbn: string;
  imageUrl: string;
}

export interface IRequestMemberBook {
  thumbnail: string | undefined;
  authors?: string[] | undefined;
  isbn?: string | undefined;
  imageUrl?: string | undefined;
  isRepresentative: boolean;
}

export interface IRequestQuizzes {
  review: string;
  quiz: string;
  quizAnswer: string;
  firstWrongChoice: string;
  secondWrongChoice: string;
}

export interface IContents {
  isRepresentative?: true;
  title?: string;
  authors?: string[];
  isbn?: string;
  thumbnail?: string;
  imageUrl?: string;
}

export interface IResponseMemberBook {
  thumbnail: ImageSourcePropType | undefined;
  memberBookId: string;
}
