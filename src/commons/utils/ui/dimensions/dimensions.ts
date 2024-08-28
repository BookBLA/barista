import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');

export const deviceWidth = windowDimensions.width;
export const deviceHeight = windowDimensions.height;
// 가로화면 고려 시 훅으로 변경
