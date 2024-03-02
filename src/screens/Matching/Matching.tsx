import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Postcard } from '../../commons/components/Postcard/Postcard';
import * as S from './Matching.styles';

const Matching = () => {
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    //todo api 활용해서 데이터 받아오는 부분
    const newItems = Array.from({ length: 20 }, (_, index) => index);
    setItems(newItems);
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <S.ViewStyled>
        <View>
          <S.PressableStyled
            onPress={() => {
              setIsReceivedPostcard(true);
            }}
            style={({ pressed }: any) => [
              {
                backgroundColor: pressed ? 'lightgrey' : isReceivedPostcard ? 'white' : 'transparent',
              },
              S.PressableStyled,
            ]}
          >
            <S.PressableTextStyled>받은 엽서</S.PressableTextStyled>
          </S.PressableStyled>
        </View>
        <View>
          <S.PressableStyled
            onPress={() => {
              setIsReceivedPostcard(false);
            }}
            style={({ pressed }: any) => [
              {
                backgroundColor: pressed ? 'lightgrey' : isReceivedPostcard ? 'transparent' : 'white',
              },
              S.PressableStyled,
            ]}
          >
            <S.PressableTextStyled>내가 보낸 엽서</S.PressableTextStyled>
          </S.PressableStyled>
        </View>
      </S.ViewStyled>
      {isReceivedPostcard && (
        //todo 수신 받은 엽서
        <>
          <S.TitleStyled style={{ fontSize: 30 }}>보낸 엽서</S.TitleStyled>
          <FlatList
            numColumns={2}
            data={items}
            renderItem={({ item, index }) => <Postcard key={index} index={index} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      {!isReceivedPostcard && (
        //todo 보낸 엽서
        <>
          <S.TitleStyled style={{ fontSize: 30 }}>내가 받은 엽서</S.TitleStyled>
          <FlatList
            numColumns={2}
            data={items}
            renderItem={({ item, index }) => <Postcard key={index} index={index} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default Matching;
