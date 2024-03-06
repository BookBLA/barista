import { StackNavigationProp } from '@react-navigation/stack';

type TRootStackParamList = {
  Home: undefined;
};

type TScreenNavigationProp = StackNavigationProp<TRootStackParamList, 'Home'>;

export interface IProps {
  navigation: TScreenNavigationProp;
}
