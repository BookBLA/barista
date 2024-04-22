import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  // EmailAuth: { isRefused: boolean };
  FailedSign: { rejectCase: [] };
};

// export type EmailAuthRouteProp = RouteProp<RootStackParamList, 'EmailAuth'>;
export type FailedSignRouteProp = RouteProp<RootStackParamList, 'FailedSign'>;

export type Props = {
  // route: EmailAuthRouteProp;
  route: FailedSignRouteProp;
};
