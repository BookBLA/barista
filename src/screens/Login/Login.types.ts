import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export interface IProps {
  navigation: ScreenNavigationProp;
}
