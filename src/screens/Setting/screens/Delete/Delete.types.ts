import { ImageSourcePropType } from 'react-native';

export interface IProps {
  route: {
    params: {
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
}
