import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import optionA from '../../../../assets/images/icons/OptionA.png';
import optionB from '../../../../assets/images/icons/OptionB.png';

const WatiComfirm = () => {
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={75} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>프로필을 확인하고 있어요!</S.ContentStyled>
          <S.ContentStyled>1시간 이내로 처리 됩니다!</S.ContentStyled>
          <View
            style={{ width: '80%', height: 40, marginTop: 20, borderRadius: 60, backgroundColor: colors.buttonMain }}
          >
            <Text>기다리시는 동안 인스타그램과 카카오채널{'\n'}팔로우 부탁드려요!</Text>

            <S.RowStyled>
              <TouchableOpacity>
                <Image source={optionA} />
                <S.TextStyled style={{ color: colors.textLinkBlue }}>인스타그램 팔로우하기</S.TextStyled>
              </TouchableOpacity>
            </S.RowStyled>
            <S.RowStyled>
              <TouchableOpacity>
                <Image source={optionB} />
                <S.TextStyled style={{ color: colors.textLinkBlue }}>카카오톡 채널 친구 추가하기</S.TextStyled>
              </TouchableOpacity>{' '}
            </S.RowStyled>

            <TouchableOpacity>
              <Text
                style={{
                  color: colors.textGray,
                  textDecorationLine: 'underline',
                  fontFamily: 'fontMedium',
                  fontSize: 12,
                  textAlign: 'right',
                  marginLeft: 2,
                }}
              >
                인증 코드 다시보내기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default WatiComfirm;
