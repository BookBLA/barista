import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Linking, ActivityIndicator } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import optionA from '../../../../assets/images/icons/OptionA.png';
import optionB from '../../../../assets/images/icons/OptionB.png';
import { LightText } from '../../../commons/components/TextComponents/LightText/LightText';
import Spinner from '../../../commons/components/Spinner/Spinner';
import useMovePage from '../../../commons/hooks/useMovePage';
const WaitConfirm = () => {
  const [loading, setLoading] = useState(true);
  const { movePage } = useMovePage();
  // Simulating loading with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={75} />
      <S.ColumnStyled style={{ height: '90%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Spinner />
          <S.ContentStyled>프로필을 확인하고 있어요!{'\n'}1시간 이내로 처리 됩니다!</S.ContentStyled>
          <S.RoundRectStyled
            style={{
              width: '80%',
              height: 'auto',
              paddingTop: 20,
              paddingLeft: 26,
              paddingBottom: 20,
              paddingRight: 26,
            }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <LightText size="16" color="black">
                기다리시는 동안 인스타그램과 카카오 채널 팔로우 부탁드려요!
              </LightText>

              <TouchableOpacity
                style={{ marginTop: 26 }}
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/book_dating?igsh=MXY3dnpzMGZ2Mm8zYQ%3D%3D&utm_source=qr')
                }
              >
                <S.RowStyled style={{ alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
                  <Image source={optionA} style={{ width: 30, height: 30 }} />
                  <S.TextStyled style={{ color: colors.textLinkBlue, marginLeft: 14 }}>
                    인스타그램 팔로우하기
                  </S.TextStyled>
                </S.RowStyled>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => Linking.openURL('http://pf.kakao.com/_NrxbnG')}
              >
                <S.RowStyled style={{ alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
                  <Image source={optionB} style={{ width: 30, height: 30 }} />
                  <S.TextStyled style={{ color: colors.textLinkBlue, marginLeft: 14 }}>
                    카카오톡 채널 친구 추가하기
                  </S.TextStyled>
                </S.RowStyled>
              </TouchableOpacity>
              <S.NextButtonStyled onPress={movePage('completePage')}>
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>시작하기</Text>
              </S.NextButtonStyled>
            </View>
          </S.RoundRectStyled>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default WaitConfirm;
