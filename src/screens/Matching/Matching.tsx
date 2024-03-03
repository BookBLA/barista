import { FlatList, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Postcard } from '../../commons/components/Postcard/Postcard';
import * as S from './Matching.styles';
import postcardIcon from '../../../assets/images/icons/Postcard.png';

const Matching = () => {
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const [postcardCount, setPostcardCount] = useState<number>(0);
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
          <S.InfoViewStyled>
            <S.InfoTextStyled>받은 엽서 확인 시 소지한 엽서가 1개 소모 됩니다</S.InfoTextStyled>
            <S.postcardCountViewStyled>
              <Image source={postcardIcon} style={{ width: 25, height: 24 }} />
              <S.postcardCountTextStyled>{postcardCount}</S.postcardCountTextStyled>
            </S.postcardCountViewStyled>
          </S.InfoViewStyled>
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
