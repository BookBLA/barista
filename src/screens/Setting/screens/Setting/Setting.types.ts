import { RouteProp } from '@react-navigation/native';

export interface ISettingData {
  version: string;
  googlePlayStoreUrl: string;
  appStoreUrl: string;
}

export type TParamList = {
  Setting: { age: number; name: string; school: string; profileImageUrl: string };
};
export type TProps = RouteProp<TParamList, 'Setting'>;
