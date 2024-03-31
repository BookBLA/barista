import React, { useMemo, useRef, useState } from 'react';
import * as S from './Home.styles';
import { colors } from '../../commons/styles/variablesStyles';
import useManageMargin from '../../commons/hooks/useManageMargin';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import Error from './units/Error/Error';
import Header from './units/Header/Header';
import BottomArrow from '../../../assets/images/icons/BottomArrow.png';
import Reset from '../../../assets/images/icons/Reset.png';
import Book from '../../../assets/images/example-book.png';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Bottom from './units/Bottom/Bottom';
import { TFilterKeys, TFilterState } from './units/Bottom/Bottom.types';
import useMovePage from '../../commons/hooks/useMovePage';
import { IProps } from './Home.types';

const initStates: TFilterState = {
  sex: '성별',
  smoking: '흡연 여부',
  drinking: '음주 여부',
  contact: '연락 스타일',
  dating: '데이트 스타일',
};

const Home: React.FC<IProps> = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('sex');
  const [filter, setFilter] = useState<TFilterState>(initStates);
  const bottomRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const { movePage } = useMovePage();
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    bottomRef.current?.present();
  };
  const tempData = new Array(11).fill(0);
  useManageMargin();

  return (
    <>
      <S.Wrapper>
        <Header />
        <S.MenuWrapper>
          <S.MenuTitle>서재 구경하기</S.MenuTitle>
          <S.FilterWrapper horizontal={true}>
            <S.FilterBox onPress={() => setFilter({ ...initStates })}>
              <S.FilterImage source={Reset} />
              <CustomText size="12px" font="fontRegular">
                초기화
              </CustomText>
            </S.FilterBox>
            {Object.keys(filter).map((key) => {
              const filterKey = key as keyof TFilterState;
              return (
                <S.FilterBox key={key} onPress={handlePresentModalPress(filterKey)}>
                  <CustomText size="12px" font="fontRegular">
                    {filter[filterKey]}
                  </CustomText>
                  <S.FilterImage source={BottomArrow} />
                </S.FilterBox>
              );
            })}
          </S.FilterWrapper>
        </S.MenuWrapper>

        {tempData.length ? (
          <S.PositionedOverlay>
            {/*<Lock />*/}
            <S.ContentWrapper>
              {tempData.map((_, index) => {
                if (index % 2 === 0) {
                  return (
                    <>
                      <S.RowStyled key={index}>
                        <S.ProfileWrapper onPress={() => navigation.navigate('OtherLibrary', { isMy: false })}>
                          <S.BookImage source={Book} />
                          <CustomText size="12px">나미야 잡화점의 상점</CustomText>
                          <CustomText size="10px">고O현 (21살)</CustomText>
                          <CustomText size="10px" color={colors.textGray}>
                            가천대학교
                          </CustomText>
                        </S.ProfileWrapper>
                        {index + 1 < tempData.length && (
                          <S.ProfileWrapper onPress={() => navigation.navigate('OtherLibrary', { isMy: false })}>
                            <S.BookImage source={Book} />
                            <CustomText size="12px">나미야 잡화점의 상점</CustomText>
                            <CustomText size="10px">0O현 (21살)</CustomText>
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
          </S.PositionedOverlay>
        ) : (
          <Error />
        )}
      </S.Wrapper>
      {selectedFilter && (
        <CustomBottomSheetModal ref={bottomRef} index={0} snapPoints={snapPoints}>
          <Bottom setFilter={setFilter} selectedFilter={selectedFilter} filter={filter} />
        </CustomBottomSheetModal>
      )}
    </>
  );
};

export default Home;
