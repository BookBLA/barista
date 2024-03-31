import { StackNavigationProp } from '@react-navigation/stack';

type OtherLibraryParams = {
  isYourLibrary: boolean;
};

type TRootStackParamList = {
  Home: undefined;
  OtherLibrary: OtherLibraryParams;
};

type TScreenNavigationProp = StackNavigationProp<TRootStackParamList, 'Home'>;

export interface IProps {
  navigation: TScreenNavigationProp;
}
