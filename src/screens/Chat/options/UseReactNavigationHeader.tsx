import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderStyleContextType, Text } from '@sendbird/uikit-react-native-foundation';

export const UseReactNavigationHeader: HeaderStyleContextType['HeaderComponent'] = ({
  title,
  right,
  left,
  onPressLeft,
  onPressRight,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      // FIXME - 한결: 헤더가 왼쪽으로 설정되지 않는 버그
      headerTitleAlign: 'left',
      headerBackVisible: false,
      headerTitle: () => (typeof title === 'string' ? <Text subtitle2>{title}</Text> : title),
      headerLeft: () => <Pressable onPress={onPressLeft}>{left}</Pressable>,
      headerRight: () => <Pressable onPress={onPressRight}>{right}</Pressable>,
    });
  }, [title, right, left, onPressLeft, onPressRight]);

  return null;
};

// const ErrorBoundaryComponent = ({ error, reset }: any) => {
//   return (
//     <View>
//       <Text>{error.message}</Text>
//       <Button onPress={reset}>{'reset uikit'}</Button>
//     </View>
//   );
// };
//
// export const ErrorBoundaryWrapper = {
//   disabled: false,
//   onError: ({ error }: any) => {
//     Analytics.logError(error);
//   },
//   ErrorInfoComponent: ErrorBoundaryComponent,
// };
