import { TextStyle, ViewStyle } from 'react-native';

export interface IProps {
  children: React.ReactNode;
  size?: string;
  color?: string;
  font?: string;
  weight?: string | number;
  margin?: string;
  style?: ViewStyle | TextStyle;
}
