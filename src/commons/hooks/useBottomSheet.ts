import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

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

  return { bottomRef, handleOpenBottomSheet, handleCloseBottomSheet };
};
