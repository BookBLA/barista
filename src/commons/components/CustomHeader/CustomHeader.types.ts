import { ImageSourcePropType } from 'react-native';

export interface ICustomHeader {
  title?: string;
  left?: boolean;
  onPressLeft?: () => void;
  right?: {
    image: ImageSourcePropType;
    onPress: () => void;
  };
  free?: React.ReactNode;
}
