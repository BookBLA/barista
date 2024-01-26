import React from 'react';
import * as S from './Example.styles';
import { useCounter } from '../../commons/store/useCounter';
import { TouchableOpacity, Button as Button2 } from 'react-native';
import Button from '../../commons/components/ButtonExample/Button';
import { getUsersApi } from '../../commons/api/example.api';

const Example = ({ navigation }: { navigation: any }) => {
  const count = useCounter((state) => state.count);
  const increment = useCounter((state) => {
    console.log('state2', state);
    return state.increment;
  });
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

  const onClickUserData = () => {
    const result = getUsersApi();
    console.log('result: {}', result);
  };

  return (
    <S.SafeAreaViewStyled>
      <S.RowStyled>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <S.ImageStyled source={require('../../../assets/images/example-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={reset}>
          <S.ImageStyled source={require('../../../assets/images/reload-icon.png')} />
        </TouchableOpacity>
      </S.RowStyled>
      <S.TitleStyled>Example Count</S.TitleStyled>
      <S.CountStyled>{count}</S.CountStyled>
      <S.RowStyled>
        <Button title="-" onPress={decrement} />
        <Button title="+" onPress={increment} />
        <Button title="api" onPress={onClickUserData} />
      </S.RowStyled>
    </S.SafeAreaViewStyled>
  );
};

export default Example;
