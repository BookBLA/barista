import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  FailedSign: { rejectCase: number[] };
};

export type FailedSignRouteProp = RouteProp<RootStackParamList, 'FailedSign'>;

export type Props = {
  route: FailedSignRouteProp;
};

export type TParamList = {
  FailedSign: { rejectCase: number[] };
};
export type TProps = RouteProp<TParamList, 'FailedSign'>;
