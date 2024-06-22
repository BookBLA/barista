import { RouteProp } from '@react-navigation/native';

export type TParamList = {
  SettingStack: {
    libraryInfo: {
      age: number;
      name: string;
      school: string;
      profileImageUrl: string;
    };
  };
};
export type TProps = RouteProp<TParamList, 'SettingStack'>;
