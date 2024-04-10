import React, { useMemo, useState } from 'react';
import { initStates } from '../../HomeStack.constants';
import { IDdata, TFilterKeys } from '../../HomeStack.types';
import { useBottomSheet } from '../../../../commons/hooks/useBottomSheet';
import { useFetchMembersSameBook } from './hooks/useFetchMembersSameBook ';
import * as S from '../../HomeStack.styles';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import Header from './units/Header/Header';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import Menu from './units/Menu/Menu';
import Profile from './units/Profile/Profile';
import Lock from './units/Lock/Lock';

const Home = () => {
  useManageMargin();
  const [filter, setFilter] = useState(initStates);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const { bottomRef, handleOpenBottomSheet } = useBottomSheet();
  const { data } = useFetchMembersSameBook(filter);
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const tempData = new Array(11).fill(0);
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    handleOpenBottomSheet();
  };

  return (
    <>
      <S.Wrapper>
        <Header />
        <Menu handlePresentModalPress={handlePresentModalPress} filter={filter} setFilter={setFilter} />
        {!data.length ? (
          <S.PositionedOverlay>
            {/* <Lock /> */}
            <S.ContentWrapper>
              {tempData.map((item: IDdata, index) => {
                if (index % 2 === 0) {
                  return (
                    <React.Fragment key={index}>
                      <S.RowStyled>
                        <Profile item={item} />
                        {index + 1 < tempData.length && <Profile item={item} />}
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

      <CustomBottomSheetModal ref={bottomRef} index={0} snapPoints={snapPoints}>
        <Bottom setFilter={setFilter} selectedFilter={selectedFilter} filter={filter} />
      </CustomBottomSheetModal>
    </>
  );
};

export default Home;
