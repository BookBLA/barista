import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { ICustomHeader } from '../components/CustomHeader/CustomHeader.types';

const useHeaderControl = ({ title, left, right, onPressLeft }: ICustomHeader) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <CustomHeader left={left} onPressLeft={onPressLeft} title={title} right={right} />,
    });
    // JSON.stringify({ title, left, right })
  }, []);
};

export default useHeaderControl;
