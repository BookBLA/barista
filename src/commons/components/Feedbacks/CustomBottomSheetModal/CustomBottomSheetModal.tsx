import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, {forwardRef, useCallback, useRef} from 'react';
import { BackHandler } from 'react-native';
import { IProps } from './CustomBottomSheetModal.types';

const CustomBottomSheetModal = forwardRef<BottomSheetModal, IProps>(
  ({ children, snapPoints, index, enableContentPanningGesture }, ref) => {
    const isBottomSheetOpen = useRef(false);
    const handleSheetChanges = useCallback((index: number) => {
      isBottomSheetOpen.current = index !== -1;
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    );

    useFocusEffect(
      useCallback(() => {
        console.log('refQQQ', ref);
        const backAction = () => {
          if (ref && 'current' in ref && ref.current && isBottomSheetOpen.current) {
            ref.current.close();
            return true;
          } else {
            return false;
          }
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
          backHandler.remove();
        };
      }, [ref]),
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={enableContentPanningGesture}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheetModal;
