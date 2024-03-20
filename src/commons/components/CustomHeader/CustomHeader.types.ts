import { ImageSourcePropType } from 'react-native';

export interface ICustomHeader {
  title: string;
  left?: boolean;
  right?: {
    image: ImageSourcePropType;
    onPress: () => void;
  };
}
