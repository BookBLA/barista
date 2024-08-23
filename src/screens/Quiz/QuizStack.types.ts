import { RouteProp } from '@react-navigation/native';

export type TParamList = {
  QuizStack: {
    bookQuizInfo: {
      memberBookId: number;
    };
  };
};
export type TProps = RouteProp<TParamList, 'QuizStack'>;
