import { Text } from 'react-native';

import * as S from './Example02.styles';
import MbtiItem from '../../commons/components/MbtiItem/MbtiItem';

const Example02 = () => {
  const mbtiNames: string[][] = [
    ['E', 'I'],
    ['S', 'N'],
    ['T', 'F'],
    ['J', 'P'],
  ];

  // 1. mbtiNames 배열의 길이가 4이므로 map(바복문)메소드를 이용하여 컴포넌트 4개를 생성
  // 2. 각각의 컴포넌트는 고유의 인스턴스(복제품)이므로 각 컴포넌트 안에 있는 스테이트 변수도 고유의 변수이다.

  return (
    <S.SafeAreaViewStyled>
      <S.TitleStyled style={{ fontSize: 30 }}>본인의 MBTI를 알려주세요!</S.TitleStyled>
      <Text style={{ fontSize: 15 }}>모르면 다음으로 넘어가주세요.</Text>
      {mbtiNames.map((name: string[], index: number) => (
        <MbtiItem key={index} name={name} />
      ))}
    </S.SafeAreaViewStyled>
  );
};

export default Example02;
