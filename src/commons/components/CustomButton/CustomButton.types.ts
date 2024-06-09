import { TouchableWithoutFeedbackProps } from 'react-native/Libraries/Components/Touchable/TouchableWithoutFeedback';

export interface IProps extends TouchableWithoutFeedbackProps {
  contents: string;
  fontColor?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderRadius?: string;
  textAlign?: string;
  margin?: string;
  padding?: string;
}
