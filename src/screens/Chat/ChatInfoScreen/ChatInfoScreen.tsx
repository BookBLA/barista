// ChatInfoScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatInfoScreen.styles';
import { ChatInfoScreenProps } from './ChatInfoScreen.types';

const ChatInfoScreen: React.FC<ChatInfoScreenProps> = ({ route }) => {
  const { partner, handleReport } = route.params;
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const navigation = useNavigation();

  const reportUser = () => {
    navigation.goBack();
    handleReport();
  };

  const toggleSwitch = () => {
    setIsNotificationEnabled((previousState) => !previousState);
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
        <Image source={{ url: partner.profileImageUrl }} style={styles.avatar} />
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

        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={[styles.optionText, styles.leaveText]}>채팅방 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInfoScreen;
