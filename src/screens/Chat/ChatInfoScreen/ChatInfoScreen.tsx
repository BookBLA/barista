// ChatInfoScreen.tsx

import { exitChatRoom, switchAlert } from '@commons/api/chat/chat.api';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmExitModal from '@screens/Chat/modals/ConfimExit/ConfirmExitModal';
import React, { useEffect, useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatInfoScreen.styles';
import { ChatInfoScreenProps } from './ChatInfoScreen.types';

const ChatInfoScreen: React.FC<ChatInfoScreenProps> = ({ route }) => {
  const { partner, handleReport, chatRoomID, isAlert } = route.params;
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isExitConfirmVisible, setIsExitConfirmVisible] = useState(false);
  const navigation = useNavigation();

  // isAlert 상태에 따라 알림 설정을 변경
  useEffect(() => {
    setIsNotificationEnabled(isAlert);
  }, [isAlert]);

  const reportUser = () => {
    navigation.goBack();
    handleReport();
  };

  const toggleSwitch = () => {
    const newAlertStatus = !isNotificationEnabled;
    setIsNotificationEnabled(newAlertStatus);
    switchAlert(chatRoomID, newAlertStatus);
  };

  const handleExitChat = async () => {
    try {
      await exitChatRoom(chatRoomID);
      setIsExitConfirmVisible(false);
      navigation.navigate('Chat', { exitedChatRoomId: chatRoomID });
    } catch (error) {
      console.error('Failed to exit chat room:', error);
    }
  };

  const confirmExitChat = () => {
    setIsExitConfirmVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#1D2E61" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채팅방 정보</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: partner.profileImageUrl }} style={styles.avatar} />
        <Text style={styles.name}>{partner.name}</Text>
      </View>

      <View style={styles.optionsSection}>
        <View style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={24} color="#1D2E61" />
          <Text style={styles.optionText}>알림</Text>
          <Switch
            style={styles.switch}
            onValueChange={toggleSwitch}
            value={isNotificationEnabled}
            trackColor={{ false: '#767577', true: '#1D2E61' }}
          />
        </View>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="book-outline" size={24} color="#1D2E61" />
          <Text style={styles.optionText}>서재 구경하기</Text>
          <Ionicons name="chevron-forward" size={24} color="#1D2E61" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={reportUser}>
          <Ionicons name="alert-circle-outline" size={24} color="#1D2E61" />
          <Text style={styles.optionText}>신고하기</Text>
          <Ionicons name="chevron-forward" size={24} color="#1D2E61" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={confirmExitChat}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={[styles.optionText, styles.leaveText]}>채팅방 나가기</Text>
        </TouchableOpacity>
      </View>

      {/* 나가기 확인 모달 */}
      <ConfirmExitModal
        isVisible={isExitConfirmVisible}
        onCancel={() => setIsExitConfirmVisible(false)}
        onExit={handleExitChat}
      />
    </View>
  );
};

export default ChatInfoScreen;
