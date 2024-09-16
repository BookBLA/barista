// ChatRequestModal.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatRequestModal.styles';
import { ChatRequestModalProps } from './ChatRequestModal.types';

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({ visible, onAccept, onDecline, onReport }) => {
  if (!visible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  return (
    // View를 이용해 Modal처럼 화면에 덮어 씌움
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명도 적용된 배경색
        justifyContent: 'center',
        alignItems: 'center',
      }}
      pointerEvents="box-none" // 모달 바깥 터치가 가능하도록 설정
    >
      <View style={[styles.modalContainer]}>
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
  );
};

export default ChatRequestModal;
