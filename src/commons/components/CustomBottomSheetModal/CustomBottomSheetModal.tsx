import React, { forwardRef, useCallback } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { IProps } from './CustomBottomSheetModal.types';

const CustomBottomSheetModal = forwardRef<BottomSheetModal, IProps>(({ children, snapPoints, index }, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log(`bottom sheet ${index >= 0 ? '열기' : '닫기'}`);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheetModal>
  );
});

export default CustomBottomSheetModal;
