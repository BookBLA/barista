import { useEffect } from 'react';
import { useHasMargin } from '../store/useHasMargin';

const useManageMargin = () => {
  const { setHasMargin } = useHasMargin();

  useEffect(() => {
    setHasMargin(false);
    return () => {
      setHasMargin(true);
    };
  }, []);
};

export default useManageMargin;
