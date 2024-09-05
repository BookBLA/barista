import * as React from 'react';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModalItem } from '@screens/Home/screens/Home/units/OnboardingModal/ModalItem';
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useSharedValue } from 'react-native-reanimated';
import { number } from 'yup';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { ModalProps } from './OnboardingModal.types';

export const OnboardingModal: React.FC<ModalProps> = ({ onClose, visible }) => {
  const modalWidth = deviceWidth * 0.9;
  const modalHeight = deviceHeight * 0.6;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = React.useState([...new Array(3).keys()]);
  const [isVertical, setIsVertical] = React.useState(false);
  const ref = React.useRef<ICarouselInstance>(null);

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
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <TouchableWithoutFeedback onPress={onClose} style={{ flex: 1, backgroundColor: '#2340a9' }}>
        <Carousel
          {...baseOptions}
          loop={false}
          ref={ref}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: '100%' }}
          data={data}
          pagingEnabled
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index }) => <ModalItem key={index} index={index} />}
        />
      </TouchableWithoutFeedback>
    </Modal>
  );
};
