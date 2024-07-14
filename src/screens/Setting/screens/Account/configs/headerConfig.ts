import { icons } from '../../../../../commons/utils/variablesImages';

export const getHeaderConfig = (handleReset: (path: string) => void) => {
  return {
    title: '계정',
    right: {
      image: icons.homeBlack,
      onPress: () => handleReset('tapScreens'),
    },
  };
};
