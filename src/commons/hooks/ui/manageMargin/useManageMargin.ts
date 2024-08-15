import { useHasMargin } from '@commons/store/ui/hasMargin/useHasMargin';
import { useEffect } from 'react';

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
