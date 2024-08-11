import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ICustomHeader } from '../../../components/Navigations/CustomHeader/CustomHeader.types';
import { CustomHeader } from '../../../components/Navigations/CustomHeader/CustomHeader';

const useHeaderControl = ({ title, left, right, onPressLeft, free }: ICustomHeader, dependencies: unknown[] = []) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader left={left} onPressLeft={onPressLeft} title={title} right={right} free={free} />,
    });
  }, dependencies);
};

export default useHeaderControl;
