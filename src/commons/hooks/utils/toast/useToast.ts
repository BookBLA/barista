import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import useToastStore from '../../../store/useToastStore';

const useToast = () => {
  // const hideToast = useToastStore((state) => state.hideToast);
  const toast = useToastStore((state) => state.toast);

  const showToast = () => {
    return Toast.show({
      type: 'info',
      text1: toast?.content,
      position: 'bottom',
      visibilityTime: 3000,
    });

    // 필요시 토스트 메시지 초기화
    // hideToast();
  };

  useEffect(() => {
    if (toast) {
      showToast();
    }
  }, [toast]);
};

export default useToast;
