import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform } from 'react-native';

export const MainView = styled.SafeAreaView`
  ${Platform.OS === 'android' && `margin-top: ${getStatusBarHeight()}px;`}
`;
