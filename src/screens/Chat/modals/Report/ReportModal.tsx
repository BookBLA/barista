import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import * as S from './ReportModal.styles'; // 스타일은 따로 관리합니다.

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onReport: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ visible, onClose, onReport }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');

  const reasons = ['닉네임', '독서 퀴즈', '책을 좋아하는 이유', '불쾌감을 주는 대화', '부적절한 만남 추구', '기타'];

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <S.ModalContainer>
        <S.ModalContent>
          <S.ModalTitle>신고 항목을 선택해 주세요</S.ModalTitle>
          <S.ModalSubtitle>중복으로 선택 가능합니다</S.ModalSubtitle>
          <ScrollView style={{ marginBottom: 10 }}>
            {reasons.map((reason, index) => (
              <TouchableOpacity key={index} onPress={() => toggleReason(reason)}>
                <S.CheckboxContainer>
                  <S.Checkbox selected={selectedReasons.includes(reason)} />
                  <S.CheckboxLabel>{reason}</S.CheckboxLabel>
                </S.CheckboxContainer>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <S.DescriptionInput
            placeholder="신고 사유를 입력해 주세요..."
            value={otherReason}
            onChangeText={setOtherReason}
            multiline
          />
          <S.DescriptionText>
            신고 사유에 맞지 않는 신고일 경우, 해당 신고는 처리되지 않습니다. 누적 신고가 일정 이상일 경우 본 서비스
            이용이 불가능하며, 프로필은 자동으로 차단됩니다.
          </S.DescriptionText>
          <S.ReportButton onPress={onReport}>
            <S.ReportButtonText>신고하기</S.ReportButtonText>
          </S.ReportButton>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
};

export default ReportModal;
