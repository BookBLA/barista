import { TouchableWithoutFeedbackProps } from 'react-native/Libraries/Components/Touchable/TouchableWithoutFeedback';

export interface IProps extends TouchableWithoutFeedbackProps {
  contents: string;
  fontColor?: string;
  fontSize?: string;
  background?: string;
}
