import { useEffect, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BackHandler } from 'react-native';

export const useBottomSheet = () => {
  const bottomRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    bottomRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    if (bottomRef.current) {
      bottomRef.current?.close();
    }
  };

  const useBackHandler = () => {
    useEffect(() => {
      const backAction = () => {
        if (bottomRef.current) {
          handleCloseBottomSheet();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }, []);
  };

  return { bottomRef, handleOpenBottomSheet, handleCloseBottomSheet, useBackHandler };
};
