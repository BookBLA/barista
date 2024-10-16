import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface IProps {
  setHasMargin?: boolean;
  setBackgroundColor?: string;
}

const useAppUIManager = ({ setHasMargin = false, setBackgroundColor = '#fff' }: IProps = {}) => {
  // const setStatus = useAppStatus((state) => state.setStatus);
  const { status, setStatus } = useAppStatus();
  const { hasMargin, isBackgroundColor } = status;

  useFocusEffect(
    useCallback(() => {
      if (setBackgroundColor !== '#fff') {
        setStatus({ isBackgroundColor: setBackgroundColor });
      }
      if (setHasMargin === false) {
        setStatus({ hasMargin: true });
      } else {
        setStatus({ hasMargin: false });
      }

      return () => {
        setStatus({ hasMargin: false, isBackgroundColor: '#fff' });
      };
    }, [hasMargin, isBackgroundColor]),
  );
};

export default useAppUIManager;
