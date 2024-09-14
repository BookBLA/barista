import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './InfoButton.styles';
import { InfoButtonProps } from './InfoButton.types';

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="information-circle-outline" size={24} color="#1D2E61" />
    </TouchableOpacity>
  );
};

export default InfoButton;
