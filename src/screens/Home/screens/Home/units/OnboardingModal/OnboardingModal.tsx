import React, { useState } from 'react';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { ModalItem } from '@screens/Home/screens/Home/units/OnboardingModal/ModalItem';
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useSharedValue } from 'react-native-reanimated';
import { number } from 'yup';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { ModalProps } from './OnboardingModal.types';

export const OnboardingModal: React.FC<ModalProps> = ({ onClose, visible }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const modalWidth = deviceWidth * 0.9;
  const modalHeight = deviceHeight * 0.66;
  const scrollOffsetValue = useSharedValue<number>(0);
  const data = ['page1', 'page2', 'page3'];
  const [isVertical, setIsVertical] = useState(false);
  const ref = React.useRef<ICarouselInstance>(null);

  // TODO: activeSlide index 오류
  const handleNextSlide = () => {
    if (activeSlide < data.length - 1) {
      ref.current?.next();
      // console.log(activeSlide);
    } else {
      onClose();
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      ref.current?.prev();
      // console.log(activeSlide);
    }
  };

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: modalWidth,
        height: modalHeight,
      } as const)
    : ({
        vertical: false,
        width: modalWidth,
        height: modalHeight,
      } as const);

  return (
    <Modal isVisible={visible}>
      <TouchableWithoutFeedback>
        <Carousel
          {...baseOptions}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 10,
            parallaxAdjacentItemScale: 0.75,
          }}
          loop={false}
          ref={ref}
          defaultScrollOffsetValue={scrollOffsetValue}
          data={data}
          pagingEnabled
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ index }) => (
            <ModalItem
              key={index}
              index={index}
              data={data}
              activeSlide={activeSlide}
              onPrevSlide={handlePrevSlide}
              onNextSlide={handleNextSlide}
              onClose={onClose}
            />
          )}
        />
      </TouchableWithoutFeedback>
    </Modal>
  );
};
