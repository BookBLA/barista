import * as S from './ChatModal.style';
import Modal from 'react-native-modal';
import React from 'react';
import { IModalProps } from '@screens/Chat/ChatStack.types';

export const EndChatModal: React.FC<IModalProps> = ({ visible, onClose, leave }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} animationIn="pulse" animationOut="fadeOut">
      <S.EndChatWrapper>
        <S.EndChatTextWrapper>
          <S.EndChatTitle>상대방이 대화를 종료하셨습니다.</S.EndChatTitle>
          <S.EndChatText>{`상대방이 채탕방을 나갔습니다.\n새로운 인연을 찾아보세요`}</S.EndChatText>
        </S.EndChatTextWrapper>

        <S.EndChatButton onPress={leave}>
          <S.EndChatButtonText>채팅방 나가기</S.EndChatButtonText>
        </S.EndChatButton>
      </S.EndChatWrapper>
    </Modal>
  );
};
