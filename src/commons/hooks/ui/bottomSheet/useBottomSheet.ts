import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

export const useBottomSheet = () => {
  const bottomRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = () => {
    console.log('handleOpenBottomSheet');
    bottomRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    if (bottomRef.current) {
      bottomRef.current?.close();
    }
  };

  const useBackHandler = (enabled: boolean) => {
    useEffect(() => {
      if (!enabled) {
        return;
      }

      const backAction = () => {
        if (bottomRef.current) {
          handleCloseBottomSheet();
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        backHandler.remove();
      };
    }, [enabled]);
  };

  return { bottomRef, handleOpenBottomSheet, handleCloseBottomSheet, useBackHandler };
};
