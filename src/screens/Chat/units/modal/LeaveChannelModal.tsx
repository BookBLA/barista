import React from 'react';
import Modal from 'react-native-modal';
import * as S from './ChatModal.style';
import { colors } from '@commons/styles/variablesStyles';
import { TouchableWithoutFeedback } from 'react-native';

interface LeaveChannelModalProps {
  visible: boolean;
  onClose: any;
  onConfirm: any;
}

export const LeaveChannelModal: React.FC<LeaveChannelModalProps> = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} animationIn="pulse" animationOut="fadeOut">
      <TouchableWithoutFeedback>
        <S.ModalBackground>
          <S.ModalContainer>
            <S.ModalText>채팅방을 나가시겠어요?</S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalButton onPress={onClose}>
                <S.ModalButtonText style={{ color: colors.buttonPrimary }}>취소</S.ModalButtonText>
              </S.ModalButton>
              <S.ModalButton onPress={onConfirm}>
                <S.ModalButtonText style={{ color: colors.buttonWrong }}>나가기</S.ModalButtonText>
              </S.ModalButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
