import { Text, View } from 'react-native';
import React from 'react';
import { IProps } from './Postcard.types';

export const Postcard: React.FC<IProps> = ({ index }) => {
  // 이 컴포넌트는 실제로 레이지 로딩이지만, 여기에서는 간단한 텍스트로 대체합니다.
  return (
    <View
      style={{
        width: '50%',
        height: 200,
        marginBottom: 10,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
      }}
    >
      <Text>포스트카드 {index}</Text>
    </View>
  );
};
