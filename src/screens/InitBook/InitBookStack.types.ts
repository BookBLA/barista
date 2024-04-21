import { RouteProp } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

export type RootStackParamList = {
  AddBook: { isModify: boolean };
};

export type AddBookRouteProp = RouteProp<RootStackParamList, 'AddBook'>;

export type Props = {
  route: AddBookRouteProp;
};
export interface IBookData {
  title: string;
  authors: string;
  isbn: string;
  imageUrl: string;
}

export interface IRequestQuizzes {
  review: string;
  quiz: string;
  quizAnswer: string;
  firstWrongChoice: string;
  secondWrongChoice: string;
}

export interface IResponseMemberBook {
  thumbnail: string;
  memberBookId: string;
  imageUrl: string;
  title: string;
  authors: string[];
}
