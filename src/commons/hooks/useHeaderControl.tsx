import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { ICustomHeader } from '../components/CustomHeader/CustomHeader.types';

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
