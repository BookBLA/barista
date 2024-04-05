import React, { useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getMemberSameBookApi } from '../../../../commons/api/member.api';
import { getMemberId } from '../../../../commons/store/memberIdStore';
import { filterOptions, initStates } from '../../HomeStack.service';
import { IDdata, TFilterKeys } from '../../HomeStack.types';
import * as S from '../../HomeStack.styles';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import Book from '../../../../../assets/images/example-book.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import Header from './units/Header/Header';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import Menu from './units/Menu/Menu';

const Home = () => {
  useManageMargin();
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const [filter, setFilter] = useState(initStates);
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
        <Menu handlePresentModalPress={handlePresentModalPress} filter={filter} setFilter={setFilter} />
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
