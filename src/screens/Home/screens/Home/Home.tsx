import React, { useMemo, useState } from 'react';
import { initStates } from '../../HomeStack.constants';
import { IDdata, TFilterKeys } from '../../HomeStack.types';
import { useBottomSheet } from '../../../../commons/hooks/useBottomSheet';
import { useFetchAllMembers } from './hooks/useFetchMembersSameBook ';
import * as S from '../../HomeStack.styles';
import Bottom from './units/Bottom/Bottom';
import Error from './units/Error/Error';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import Menu from './units/Menu/Menu';
import Item from './units/Item/Item';
import Lock from './units/Lock/Lock';
import useMemberStore from '../../../../commons/store/useMemberStore';
import { EMemberStatus } from '../../../../commons/types/memberStatus';

const Home = () => {
  const [filter, setFilter] = useState(initStates);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const { bottomRef, handleOpenBottomSheet, useBackHandler } = useBottomSheet();
  const { data, setPage } = useFetchAllMembers(filter);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const dataLength = data.length;
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    handleOpenBottomSheet();
  };

  return (
    <>
      <S.Wrapper>
        <Menu handlePresentModalPress={handlePresentModalPress} filter={filter} setFilter={setFilter} />
        {dataLength ? (
          <S.PositionedWrapper>
            {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}
            <S.ContentWrapper
              data={data}
              renderItem={({ item, index }: { item: IDdata; index: number }) => (
                <Item item={item} index={index} dataLength={dataLength} data={data} />
              )}
              keyExtractor={(item: IDdata, index: number) => `${item.memberId}-${index}`}
              onEndReached={() => setPage((prevPage) => prevPage + 1)}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={true}
            />
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
