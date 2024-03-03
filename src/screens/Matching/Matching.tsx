import { FlatList, Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ReceivePostcard } from './Postcard/Receive/ReceivePostcard';
import * as S from './Matching.styles';
import postcardIcon from '../../../assets/images/icons/Postcard.png';
import { IPostcardProps } from './Postcard/Receive/ReceivePostcard.types';
import { SendPostcard } from './Postcard/Send/SendPostcard';

const Matching = () => {
  const [isReceivedPostcard, setIsReceivedPostcard] = useState<boolean>(true);
  const [postcardCount, setPostcardCount] = useState<number>(0);
  const [items, setItems] = useState<IPostcardProps[]>([]);

  useEffect(() => {
    //todo api 활용해서 데이터 받아오는 부분
    const fakeData: IPostcardProps[] = Array.from({ length: 10 }, (_, index) => ({
      index,
      userId: Math.floor(Math.random() * 1000) + 1, // 임의의 userId 생성 (1 이상 1000 이하의 난수)
      quizScore: Math.floor(Math.random() * 101), // 임의의 퀴즈 점수 생성 (0 이상 100 이하의 난수)
      schoolName: `School ${index + 1}`, // 학교 이름 생성
      age: index + 1,
      postcardImageUrl: `https://example.com/postcard-${index + 1}.jpg`, // 가짜 이미지 URL 생성
    }));

    setItems(fakeData);
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
            data={items}
            renderItem={({ item, index }) => (
              <S.receivedPostcardViewStyled index={index}>
                <ReceivePostcard key={index} {...item} />
              </S.receivedPostcardViewStyled>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // 열 갯수 설정
          />
        </>
      )}
      {!isReceivedPostcard && (
        //todo 보낸 엽서
        <>
          <FlatList
            contentContainerStyle={{
              marginTop: 14,
            }}
            data={items}
            renderItem={({ item, index }) => (
              <S.sendPostcardViewStyled>
                <SendPostcard key={index} {...item} />
              </S.sendPostcardViewStyled>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default Matching;
