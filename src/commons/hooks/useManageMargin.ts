import { useCallback } from 'react';
import { useHasMargin } from '../store/useHasMargin';
import { useFocusEffect } from '@react-navigation/native';

// todo: 개선예정
const useManageMargin = () => {
  const { setHasMargin, hasMargin } = useHasMargin();

  useFocusEffect(
    useCallback(() => {
      setHasMargin(false);
      return () => {
        setHasMargin(true);
      };
    }, [hasMargin]),
  );
};

export default useManageMargin;
