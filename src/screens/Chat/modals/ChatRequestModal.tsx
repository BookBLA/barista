// ChatRequestModal.tsx
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatRequestModal.styles';
import { ChatRequestModalProps } from './ChatRequestModal.types';

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({ visible, onAccept, onDecline, onReport }) => {
  return (
    // <Modal transparent visible={visible} animationType="slide"
    // flash로 아래에서 위로 올라오는 애니메이션을 사용하지 않고, fade로 투명도가 변하는 애니메이션을 사용합니다.
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>닉네임님의 매칭 요청을 수락하시겠어요?</Text>
          <Text style={styles.description}>
            수락하면 책갈피 30개가 사용되며 채팅이 시작됩니다. 채팅이 시작되면 받은 엽서 목록에서 사라지며 채팅방으로
            이동됩니다. 엽서를 받고 3일 동안 응답하지 않으면 자동으로 거절됩니다.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reportButton} onPress={onReport}>
              <Text style={styles.reportButtonText}>신고</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
              <Text style={styles.declineButtonText}>거절</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Text style={styles.acceptButtonText}>수락</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChatRequestModal;
