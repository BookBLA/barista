import { RouteProp } from '@react-navigation/native';
import {boolean} from "yup";

export type TParamList = {
  QuizStack: {
    bookQuizInfo: {
      memberBookId: number;
    };
  };
};
export type TProps = RouteProp<TParamList, 'QuizStack'>;

export interface IVerifyQuizAnswer {
  quizId?: number;
  quizAnswer: string;
}

export interface IPostPostcard {
  postcardTypeId: number;
  receiveMemberId: number;
  memberReply: string;
}

// export interface TQuizIsCorrect {
//   isCorrect: boolean;
// }
