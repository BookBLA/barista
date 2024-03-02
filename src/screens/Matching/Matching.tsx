import { FlatList, SafeAreaView, View } from 'react-native';
import * as S from './Matching.styles';
import React, { useEffect, useState } from 'react';
import { Postcard } from '../../commons/components/Postcard/Postcard';

const Matching = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    //todo api 활용해서 데이터 받아오는 부분
    const newItems = Array.from({ length: 20 }, (_, index) => index);
    setItems(newItems);
  }, []);

  return (
    <SafeAreaView>
      <View style={{ marginTop: 100 }}>
        <S.TitleStyled style={{ fontSize: 30 }}>매칭 페이지입니다!</S.TitleStyled>
        <FlatList
          numColumns={2}
          data={items}
          renderItem={({ item, index }) => <Postcard key={index} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Matching;
