import React, { useMemo, useState } from 'react';
import { initStates } from '../../HomeStack.constants';
import { IDdata, TFilterKeys } from '../../HomeStack.types';
import { useBottomSheet } from '../../../../commons/hooks/useBottomSheet';
import { useFetchMembersSameBook } from './hooks/useFetchMembersSameBook ';
import * as S from '../../HomeStack.styles';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import Menu from './units/Menu/Menu';
import Profile from './units/Profile/Profile';

const Home = () => {
  const [filter, setFilter] = useState(initStates);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const { bottomRef, handleOpenBottomSheet, useBackHandler } = useBottomSheet();
  const { data } = useFetchMembersSameBook(filter);
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    handleOpenBottomSheet();
  };

  return (
    <>
      <S.Wrapper>
        <Menu handlePresentModalPress={handlePresentModalPress} filter={filter} setFilter={setFilter} />
        {data.length ? (
          <S.PositionedWrapper>
            {/* <Lock /> */}
            <S.ContentWrapper>
              {data.map((item: IDdata, index) => {
                if (index % 2 === 0) {
                  return (
                    <React.Fragment key={index}>
                      <S.RowWrapper>
                        <Profile item={item} />
                        {index + 1 < data.length && <Profile item={data[index + 1]} />}
                      </S.RowWrapper>
                      <S.Line />
                    </React.Fragment>
                  );
                }
              })}
            </S.ContentWrapper>
          </S.PositionedWrapper>
        ) : (
          <Error />
        )}
      </S.Wrapper>

      <CustomBottomSheetModal
        ref={bottomRef}
        index={0}
        snapPoints={snapPoints}
        children={
          <Bottom
            useBackHandler={useBackHandler}
            setFilter={setFilter}
            selectedFilter={selectedFilter}
            filter={filter}
          />
        }
      />
    </>
  );
};

export default Home;
