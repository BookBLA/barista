import { Text, View } from 'react-native';

import * as S from './Example02.styles';
import MbtiItem from '../../commons/components/MbtiItem/MbtiItem';
import { deviceHeight, deviceWidth } from '../../commons/utils/dimensions';

const Example02 = () => {
  const mbtiNames: string[][] = [
    ['E\n외향형', 'I\n내향형'],
    ['S\n감각형', 'N\n직관형'],
    ['T\n사고형', 'F\n감정형'],
    ['J\n판단형', 'P\n인식형'],
  ];

  // 1. mbtiNames 배열의 길이가 4이므로 map(바복문)메소드를 이용하여 컴포넌트 4개를 생성
  // 2. 각각의 컴포넌트는 고유의 인스턴스(복제품)이므로 각 컴포넌트 안에 있는 스테이트 변수도 고유의 변수이다.

  return (
    <View style={{ height: deviceHeight * 0.52, justifyContent: 'space-between' }}>
      {mbtiNames.map((name: string[], index: number) => (
        <MbtiItem key={index} name={name} />
      ))}
    </View>
  );
};

export default Example02;
