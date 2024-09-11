import React, { useState } from 'react';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';

import { ModalItem } from '@commons/components/Specific/OnboardingModal/ModalItem';
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useSharedValue } from 'react-native-reanimated';
import { number } from 'yup';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { ModalProps } from './HomeOnboardingModal.types';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';

export const HomeOnboardingModal: React.FC<ModalProps> = ({ onClose, visible }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const modalWidth = deviceWidth * 0.9;
  const modalHeight = deviceHeight * 0.66;
  const scrollOffsetValue = useSharedValue<number>(0);

  const data = [
    {
      image: img.homeOnboarding1,
      title: '하루 최대 4명,\n오늘의 만남을 놓치지 마세요',
      description:
        '무료 2명에 광고 시청으로 2명을 더 소개받을 수 있어요.\n단, 오늘 매칭하지 않으면 자정에 초기화됩니다!',
      leftButtonText: '',
      rightButtonText: '다음',
      indexImage: img.homOnboardingPage1,
    },
    {
      image: img.homeOnboarding2,
      title: '독서 퀴즈,\n신중하게 도전하세요!',
      description: '퀴즈에 성공해야 상대방에게 엽서가 전송됩니다.\n틀리면 상대방이 사라지니 신중히 풀어보세요.',
      leftButtonText: '이전',
      rightButtonText: '다음',
      indexImage: img.homOnboardingPage2,
    },
    {
      image: img.homeOnboarding3,
      title: '매일 무료 책갈피,\n친구 초대로 추가 보상까지!',
      description: '광고를 보고 매일 무료 재화를 받아보세요.\n친구를 초대하면 더 많은 보상이 기다리고 있어요.',
      leftButtonText: '이전',
      rightButtonText: '시작하기',
      indexImage: img.homOnboardingPage3,
    },
  ];

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
          renderItem={({ item, index }) => (
            <ModalItem
              key={index}
              index={index}
              item={item}
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
