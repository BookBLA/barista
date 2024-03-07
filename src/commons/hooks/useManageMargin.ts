import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useHasMargin } from '../store/useHasMargin';

const useManageMargin = () => {
  const { enableMargin, disableMargin } = useHasMargin();

  useFocusEffect(
    useCallback(() => {
      disableMargin();
      return () => {
        enableMargin();
      };
    }, []),
  );
};

export default useManageMargin;
