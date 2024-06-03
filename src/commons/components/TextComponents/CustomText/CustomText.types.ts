import { TextStyle, ViewStyle } from 'react-native';

export interface IProps<T extends unknown[] = []> {
  children: React.ReactNode;
  size?: string;
  color?: string;
  font?: string;
  weight?: string | number;
  margin?: string;
  style?: ViewStyle | TextStyle;
  onPress?: (...args: T) => void;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}
