import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  EmailAuth: { isRefused: boolean };
};

export type EmailAuthRouteProp = RouteProp<RootStackParamList, 'EmailAuth'>;

export type Props = {
  route: EmailAuthRouteProp;
};
