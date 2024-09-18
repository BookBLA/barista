import { CustomHeader } from '@commons/components/Navigations/CustomHeader/CustomHeader';
import { ICustomHeader } from '@commons/components/Navigations/CustomHeader/CustomHeader.types';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const useHeaderControl = (
  { title, left, right, onPressLeft, customContent }: ICustomHeader,
  dependencies: unknown[] = [],
) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <CustomHeader left={left} onPressLeft={onPressLeft} title={title} right={right} customContent={customContent} />
      ),
    });
  }, dependencies);
};

export default useHeaderControl;
