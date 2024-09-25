import { RouteProp } from '@react-navigation/native';

export type TParamList = {
  QuizStack: {
    memberBookId: number;
    targetMemberId: number;
    text?: string;
  };
};
export type TProps = RouteProp<TParamList, 'QuizStack'>;

export type TPassQuiz = {
  QuizStack: {
    isPassQuiz: boolean;
  };
};
export type TCompleteQuiz = RouteProp<TPassQuiz, 'QuizStack'>;

export interface IVerifyQuizAnswer {
  quizMakerId: number;
  quizId?: number;
  quizAnswer: string;
}

export interface IPostPostcard {
  postcardTypeId: number;
  receiveMemberId: number;
  memberReply: string;
}

export interface ISendPostcardRequest {
  postcardTypeId: number;
  receiveMemberId: number;
  memberReply: string;
}
