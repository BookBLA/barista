import { RouteProp } from '@react-navigation/native';

export enum EBook {
  MaxBooks = 4,
}

export type TParamList = {
  AddBook: { isStylePage: boolean };
};
export type TProps = RouteProp<TParamList, 'AddBook'>;
