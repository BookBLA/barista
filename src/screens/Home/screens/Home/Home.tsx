import React, { useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useLogout } from '../../../../commons/hooks/useLogout';
import { icons } from '../../../../commons/utils/variablesImages';
import { getMemberSameBookApi } from '../../../../commons/api/member.api';
import { getMemberId } from '../../../../commons/store/memberIdStore';
import * as S from '../../HomeStack.styles';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import Book from '../../../../../assets/images/example-book.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import Header from './units/Header/Header';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { IDdata, TFilterKeys, TFilterOptionsType, TFilterState } from '../../HomeStack.types';

// todo: 상수 파일 정리 예정
const filterOptions: TFilterOptionsType = {
  gender: [
    { label: '성별', value: '' },
    { label: '남성', value: 'MALE' },
    { label: '여성', value: 'FEMALE' },
  ],
  smoking: [
    { label: '흡연 여부', value: '' },
    { label: '비흡연', value: 'NON_SMOKE' },
    { label: '흡연', value: 'SMOKE' },
  ],
  drinking: [
    { label: '음주 여부', value: '' },
    { label: '음주 X', value: 'NONE' },
    { label: '월 1~2회', value: 'ONCE_A_MONTH' },
    { label: '주 1회', value: 'ONCE_A_WEEK' },
    { label: '주 2회 이상', value: 'OVER_ONCE_A_WEEK' },
    { label: '매일', value: 'EVERYDAY' },
  ],
  contact: [
    { label: '연락 스타일', value: '' },
    { label: '느긋이', value: 'SLOW' },
    { label: '칼답', value: 'FAST' },
  ],
  dating: [
    { label: '데이트 스타일', value: '' },
    { label: '집 데이트', value: 'HOME' },
    { label: '야외 데이트', value: 'OUTSIDE' },
  ],
};

const initStates: TFilterState = {
  gender: filterOptions.gender[0].label,
  smoking: filterOptions.smoking[0].label,
  drinking: filterOptions.drinking[0].label,
  contact: filterOptions.contact[0].label,
  dating: filterOptions.dating[0].label,
};

const Home = () => {
  useManageMargin();
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const [filter, setFilter] = useState(initStates);
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
    const params = Object.keys(filter).reduce(
      (acc, key) => {
        const filterKey = key as TFilterKeys;
        const option = filterOptions[filterKey].find((option) => option.label === filter[filterKey]);
        if (option) {
          acc[key] = option.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    try {
      const memberId = (await getMemberId()) ?? '';
      const response = await getMemberSameBookApi(memberId, { params });
      setData(response.result.content);
    } catch (error) {
      console.log('errors', error);
    }
  };

  useEffect(() => {
    fetchMembersWithSameBook();
  }, [filter]);

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

        {data.length ? (
          <S.PositionedOverlay>
            {/* <Lock /> */}
            <S.ContentWrapper>
              {data.map((el: IDdata, index) => {
                if (index % 2 === 0) {
                  return (
                    <React.Fragment key={index}>
                      <S.RowStyled>
                        <S.ProfileWrapper>
                          <S.BookImage source={Book} />
                          <CustomText size="12px">{el.bookName}</CustomText>
                          <CustomText size="10px">{el.memberAge}</CustomText>
                          <CustomText size="10px" color={colors.textGray}>
                            {el.memberSchoolName}
                          </CustomText>
                        </S.ProfileWrapper>
                        {index + 1 < tempData.length && (
                          <S.ProfileWrapper onPress={movePage('OtherLibrary', { isYourLibrary: true })}>
                            <S.BookImage source={Book} />
                            <CustomText size="12px">{el.bookName}</CustomText>
                            <CustomText size="10px">{`${el.memberName} (${el.memberAge}살)`}</CustomText>
                            <CustomText size="10px" color={colors.textGray}>
                              {el.memberSchoolName}
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
