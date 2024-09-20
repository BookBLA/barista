// @screens/Chat/modals/ChatRequest/ChatRequestModal

import { postPostcardStatusUpdate } from '@commons/api/matching/matching.api'; // 필요한 API 함수 import
import useToastStore from '@commons/store/ui/toast/useToastStore'; // 토스트 메시지를 띄우기 위한 훅
import { EPostcardStatus } from '@screens/Matching/Postcard/Send/SendPostcard.types';
import React, { useCallback } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatRequestModal.styles';
import { ChatRequestModalProps } from './ChatRequestModal.types';

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({
  visible,
  onAccept,
  onDecline,
  onReport,
  postcard,
  partner,
}) => {
  if (!visible) return null; // 모달이 보이지 않을 때는 렌더링하지 않음

  // 엽서 수락 기능 정의
  const handleAccept = useCallback(async () => {
    try {
      // 서버에 엽서 수락 상태 전송
      await postPostcardStatusUpdate({ postcardId: postcard.postcardId, status: EPostcardStatus.ACCEPT });

      // 엽서 수락 성공 시 처리 (필요 시 추가 처리 가능)
      useToastStore.getState().showToast({ content: '엽서를 수락하였습니다.' });

      if (onAccept) {
        onAccept(); // 부모 컴포넌트의 onAccept 호출 (모달 닫기 등 추가 기능)
      }
    } catch (error) {
      console.error('엽서 수락 중 오류 발생:', error);
    }
  }, [onAccept]);

  return (
    <Modal
      visible={visible}
      animationType="slide" // 슬라이드 애니메이션으로 모달 표시
      transparent // 배경을 투명하게 설정
      // 하단에 위치하도록 설정
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{partner.name}님의 매칭 요청을 수락하시겠어요?</Text>
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

            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.acceptButtonText}>수락</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChatRequestModal;
