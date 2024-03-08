import React from 'react';
import * as S from './Home.styles';
import { CustomText } from '../../commons/components/CustomText/CustomText.styles';
import { colors } from '../../commons/styles/variablesStyles';
import useManageMargin from '../../commons/hooks/useManageMargin';

const Home = () => {
  const tempData = new Array(11).fill(0);
  useManageMargin();

  return (
    <S.Wrapper>
      <S.HeaderWrapper>
        <S.LogoWrapper>
          <S.LogoImage source={require('../../../assets/images/logos/logoDarkBg.png')} />
          <S.LogoTitle>BOOK BLA</S.LogoTitle>
        </S.LogoWrapper>
        <S.IconWrapper>
          <S.IconImage source={require('../../../assets/images/icons/Postcard.png')} />
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
              <S.FilterImage source={require('../../../assets/images/icons/BottomArrow.png')} />
            </S.FilterBox>
          ))}
        </S.FilterWrapper>
      </S.MenuWrapper>
      <S.ContentWrapper>
        {tempData.map((_, index) => {
          if (index % 2 === 0) {
            return (
              <>
                <S.RowStyled key={index}>
                  <S.ProfileWrapper>
                    <S.BookImage source={require('../../../assets/images/example-book.png')} />
                    <CustomText size="12px">나미야 잡화점의 상점</CustomText>
                    <CustomText size="10px">고O현 (21살)</CustomText>
                    <CustomText size="10px" color={colors.textGray}>
                      가천대학교
                    </CustomText>
                  </S.ProfileWrapper>
                  {index + 1 < tempData.length && (
                    <S.ProfileWrapper>
                      <S.BookImage source={require('../../../assets/images/example-book.png')} />
                      <CustomText size="12px">나미야 잡화점의 상점</CustomText>
                      <CustomText size="10px">고O현 (21살)</CustomText>
                      <CustomText size="10px" color={colors.textGray}>
                        가천대학교
                      </CustomText>
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
