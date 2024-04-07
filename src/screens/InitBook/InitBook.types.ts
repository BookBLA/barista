import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  AddBook: { isModify: boolean };
};

export type AddBookRouteProp = RouteProp<RootStackParamList, 'AddBook'>;

export type Props = {
  route: AddBookRouteProp;
};
