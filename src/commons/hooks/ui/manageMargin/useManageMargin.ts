import { useEffect } from 'react';
import { useHasMargin } from '../../../store/useHasMargin';

const useManageMargin = () => {
  const { setHasMargin, hasMargin } = useHasMargin();

  useEffect(() => {
    setHasMargin(false);
    return () => {
      setHasMargin(true);
    };
  }, [hasMargin]);
};

export default useManageMargin;
