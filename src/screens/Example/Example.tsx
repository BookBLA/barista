import React from 'react';
import * as S from './Example.styles';
import { useCounter } from '../../commons/store/useCounter';
import { TouchableOpacity } from 'react-native';
import Button from '../../commons/components/ButtonExample/Button';
import { getExampleApi, postExampleApi } from '../../commons/api/example.api';

const Example = ({ navigation }: { navigation: any }) => {
  const count = useCounter((state) => state.count);
  const increment = useCounter((state) => {
    return state.increment;
  });
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

  const onClickPostData = async () => {
    const result = await postExampleApi('contents');
    console.log('result: {}', result);
  };

  const onClickGetData = async () => {
    const result = await getExampleApi('string');
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
      </S.RowStyled>
      <S.RowStyled>
        <Button title="POST" onPress={onClickPostData} />
        <Button title="GET" onPress={onClickGetData} />
      </S.RowStyled>
    </S.SafeAreaViewStyled>
  );
};

export default Example;
