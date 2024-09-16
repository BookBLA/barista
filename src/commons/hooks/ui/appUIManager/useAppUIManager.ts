import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

interface IProps {
  setHasMargin?: boolean;
  setBackgroundColor?: string;
}

const useAppUIManager = ({ setHasMargin = false, setBackgroundColor = '#fff' }: IProps = {}) => {
  const setStatus = useAppStatus((state) => state.setStatus);

  useFocusEffect(
    useCallback(() => {
      console.log('화면 포커스 얻음');
      if (setBackgroundColor !== '#fff') {
        setStatus({ isBackgroundColor: setBackgroundColor });
      }
      if (setHasMargin === false) {
        setStatus({ hasMargin: true });
      } else {
        setStatus({ hasMargin: false });
      }

      return () => {
        console.log('화면 포커스 잃음');
        setStatus({ hasMargin: false, isBackgroundColor: '#fff' });
      };
    }, [setBackgroundColor, setHasMargin]),
  );
};

export default useAppUIManager;
