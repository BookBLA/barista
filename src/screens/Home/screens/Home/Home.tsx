import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as S from '../../HomeStack.styles';
import { colors } from '../../../../commons/styles/variablesStyles';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import Book from '../../../../../assets/images/example-book.png';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getMembersSameBook } from '../../../../commons/api/member.api';
import { useLogout } from '../../../../commons/hooks/useLogout';
import useMovePage from '../../../../commons/hooks/useMovePage';
import { icons } from '../../../../commons/utils/variablesImages';
import { TFilterKeys, TFilterState } from './units/Bottom/Bottom.types';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import Header from './units/Header/Header';

const initStates: TFilterState = {
  gender: '성별',
  smoking: '흡연 여부',
  drinking: '음주 여부',
  contact: '연락 스타일',
  dating: '데이트 스타일',
};

const Home = () => {
  useManageMargin();
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const [filter, setFilter] = useState<TFilterState>(initStates);
  const { onClickLogout } = useLogout();
  const bottomRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const { movePage } = useMovePage();
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    bottomRef.current?.present();
  };
  const tempData = new Array(11).fill(0);

  const fetchMembersWithSameBook = async () => {
    try {
      const result = await getMembersSameBook({});
      setData(result.response);
      console.log('result: {}', result.response);
    } catch (error) {
      console.log('errors', error);
    }
  };

  useEffect(() => {
    fetchMembersWithSameBook();
  }, []);

  return (
    <>
      <S.Wrapper>
        <Header />
        <S.MenuWrapper>
          <CustomText margin="0 0 8px" onPress={onClickLogout}>
            서재 구경하기
          </CustomText>
          <S.FilterWrapper horizontal={true}>
            <S.FilterBox onPress={() => setFilter({ ...initStates })} isSelect={true}>
              <S.FilterImage source={icons.reset} />
              <CustomText size="12px" font="fontRegular">
                초기화
              </CustomText>
            </S.FilterBox>

            {Object.keys(filter).map((key) => {
              const filterKey = key as keyof TFilterState;
              return (
                <S.FilterBox
                  key={key}
                  onPress={handlePresentModalPress(filterKey)}
                  isSelect={filter[filterKey] === initStates[filterKey]}
                >
                  <CustomText size="12px" font="fontRegular">
                    {filter[filterKey]}
                  </CustomText>
                  <S.FilterImage source={icons.bottomArrow} />
                </S.FilterBox>
              );
            })}
          </S.FilterWrapper>
        </S.MenuWrapper>

        {!data.length ? (
          <S.PositionedOverlay>
            {/* <Lock /> */}
            <S.ContentWrapper>
              {tempData.map((_, index) => {
                if (index % 2 === 0) {
                  return (
                    <React.Fragment key={index}>
                      <S.RowStyled>
                        <S.ProfileWrapper>
                          <S.BookImage source={Book} />
                          <CustomText size="12px">나미야 잡화점의 상점</CustomText>
                          <CustomText size="10px">고O현 (21살)</CustomText>
                          <CustomText size="10px" color={colors.textGray}>
                            가천대학교
                          </CustomText>
                        </S.ProfileWrapper>
                        {index + 1 < tempData.length && (
                          <S.ProfileWrapper onPress={movePage('OtherLibrary', { isYourLibrary: true })}>
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
                    </React.Fragment>
                  );
                }
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
