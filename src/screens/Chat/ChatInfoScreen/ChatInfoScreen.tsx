import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatInfoScreen.styles';
import { ChatInfoScreenProps } from './ChatInfoScreen.types';

const ChatInfoScreen: React.FC<ChatInfoScreenProps> = ({ route }) => {
  const { user } = route.params;
  const patner = {
    avatar: require('@assets/images/img/profile_ex1.png'),
    school: '서울대학교',
    smokingStatus: '흡연',
    mbti: 'ENFP',
    height: 170,
    nickname: '김서울',
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채팅방 정보</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={patner.avatar} style={styles.avatar} />
        <Text style={styles.username}>{patner.nickname}</Text>
      </View>

      <View style={styles.optionsSection}>
        <View style={styles.optionItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.optionText}>알림</Text>
          <Switch style={styles.switch} />
        </View>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="book-outline" size={24} color="black" />
          <Text style={styles.optionText}>서재 구경하기</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="alert-circle-outline" size={24} color="black" />
          <Text style={styles.optionText}>신고하기</Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={[styles.optionText, styles.leaveText]}>채팅방 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInfoScreen;
