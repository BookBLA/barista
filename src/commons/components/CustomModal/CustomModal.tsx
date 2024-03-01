import React from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import * as S from './CustomModal.styles';
import { IProps } from './CustomModal.types';
import { ModalButtons } from './ModalButtons/ModalButtons';

export const CustomModal: React.FC<IProps> = ({ visible, onClose, children, close, buttons, mode, size }) => {
  // props 줄이는법 생각하기
  // 1. modalConfig 객체를 만들어서 줄이기
  // 2. 다른 방법 찾아보기

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <S.Wrapper>
          <TouchableWithoutFeedback>
            <S.InnerWrapper close={close} size={size}>
              {close && (
                <S.TopWrapper>
                  <TouchableOpacity onPress={onClose}>
                    <Image source={require('../../../../assets/images/icons/close.png')} />
                  </TouchableOpacity>
                </S.TopWrapper>
              )}
              {children}
              {buttons && mode && (
                <S.ButtonWrapper>
                  <ModalButtons buttons={buttons} mode={mode} />
                </S.ButtonWrapper>
              )}
            </S.InnerWrapper>
          </TouchableWithoutFeedback>
        </S.Wrapper>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
