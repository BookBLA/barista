import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { IProps } from './CustomBottomSheetModal.types';
import { BackHandler } from 'react-native';

const CustomBottomSheetModal = forwardRef<BottomSheetModal, IProps>(({ children, snapPoints, index }, ref) => {
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // TODO: 성진 - 타입 오류는 추후에 수정예정
  useImperativeHandle(
    ref,
    () => ({
      close: () => bottomSheetRef.current?.close(),
      present: () => bottomSheetRef.current?.present(),
      dismiss: () => bottomSheetRef.current?.dismiss(),
      snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
      snapToPosition: (position: number | string, animationConfigs?: any) =>
        bottomSheetRef.current?.snapToPosition(position, animationConfigs),
      expand: () => bottomSheetRef.current?.expand(),
    }),
    [],
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  useEffect(() => {
    const backAction = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      backHandler.remove();
    };
  }, []);

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
