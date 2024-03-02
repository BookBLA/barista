import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import * as S from './CustomModal.styles';
import { IProps } from './CustomModal.types';
import { ModalButtons } from './ModalButtons/ModalButtons';
import { CloseButton } from './CloseButton/CloseButton';

export const CustomModal: React.FC<IProps> = ({ children, modalConfig }) => {
  const { buttons, size, mode, close, onClose, visible } = modalConfig;

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Wrapper>
          <TouchableWithoutFeedback>
            <S.InnerWrapper close={close} size={size}>
              {close && <CloseButton onClose={onClose} />}
              {children}
              {buttons && mode && <ModalButtons buttons={buttons} mode={mode} />}
            </S.InnerWrapper>
          </TouchableWithoutFeedback>
        </S.Wrapper>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
