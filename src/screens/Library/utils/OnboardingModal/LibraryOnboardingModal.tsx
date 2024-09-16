import React, { useState } from 'react';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, View } from 'react-native';
import { ModalItem } from '@commons/components/Specific/OnboardingModal/ModalItem';
import { ModalProps } from '@screens/Library/utils/OnboardingModal/LibraryOnboardingModal.types';
import { postOnboardingStatus } from '@commons/api/onboarding/onboarding.api';

export const LibraryOnboardingModal: React.FC<ModalProps> = ({ onClose, visible }) => {
  const modalWidth = deviceWidth * 0.9;
  const modalHeight = deviceHeight * 0.66;

  const data = {
    image: img.libraryOnboarding,
    title: '내가 좋아하는 책,\n4권 이상 등록 가능!',
    description: '좋아하는 책을 4권 이상 등록해 보세요.\n첫 4권은 책갈피를 드려요!',
  };

  return (
    <Modal isVisible={visible}>
      <TouchableWithoutFeedback
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={{ width: modalWidth, height: modalHeight }}>
          <ModalItem index={-1} item={data} where="LIBRARY" onClose={onClose} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
