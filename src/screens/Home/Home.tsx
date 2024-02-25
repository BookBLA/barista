import React from 'react';
import { IProps } from './Home.types';
import * as S from './Home.styles';

const Home = ({ navigation }: IProps) => {
  const tempData = new Array(11).fill(0);

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.HeaderWrapper>
          <S.LogoWrapper>
            <S.LogoImage source={require('../../../assets/images/logos/logoDarkBg.png')} />
            <S.LogoTitle>BOOK BLA</S.LogoTitle>
          </S.LogoWrapper>
          <S.IconWrapper>
            <S.IconImage source={require('../../../assets/images/icons/letter.png')} />
            <S.IconText>3</S.IconText>
            <S.IconImage source={require('../../../assets/images/icons/notice.png')} />
          </S.IconWrapper>
        </S.HeaderWrapper>
        <S.MenuWrapper>
          <S.MenuTitle>서재 구경하기</S.MenuTitle>
          <S.FilterWrapper horizontal={true}>
            {new Array(7).fill(0).map((el) => (
              <S.FilterBox>
                <S.FilterText>성별</S.FilterText>
                <S.FilterImage source={require('../../../assets/images/icons/arrowBottom.png')} />
              </S.FilterBox>
            ))}
          </S.FilterWrapper>
        </S.MenuWrapper>
      </S.TopWrapper>
      <S.ContentWrapper>
        {tempData.map((_, index) => {
          if (index % 2 === 0) {
            return (
              <>
                <S.RowStyled key={index}>
                  <S.ProfileWrapper>
                    <S.BookImage source={require('../../../assets/images/bookTest.png')} />
                  </S.ProfileWrapper>
                  {index + 1 < tempData.length && (
                    <S.ProfileWrapper>
                      <S.BookImage source={require('../../../assets/images/bookTest.png')} />
                    </S.ProfileWrapper>
                  )}
                </S.RowStyled>
                <S.Line></S.Line>
              </>
            );
          }
          return null;
        })}
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default Home;
