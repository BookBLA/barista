import { RouteProp } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native';

export type TParamList = {
  Delete: {
    config: {
      title: string;
      left?: boolean;
      right?: {
        image: ImageSourcePropType;
        onPress: () => void;
      };
    };
  };
};
export type TProps = RouteProp<TParamList, 'Delete'>;
