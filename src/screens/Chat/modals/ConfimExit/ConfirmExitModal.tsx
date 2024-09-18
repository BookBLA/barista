import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmExitModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onExit: () => void;
}

const ConfirmExitModal: React.FC<ConfirmExitModalProps> = ({ isVisible, onCancel, onExit }) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 280, padding: 20, backgroundColor: 'white', borderRadius: 10, paddingBottom: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>채팅방을 나가시겠어요?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ padding: 10 }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onExit}>
              <Text style={{ padding: 10, color: 'red' }}>나가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmExitModal;
