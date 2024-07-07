import React, { useMemo, useState } from 'react';
import { initStates } from '../../HomeStack.constants';
import { IDdata, TFilterKeys } from '../../HomeStack.types';
import { useBottomSheet } from '../../../../commons/hooks/useBottomSheet';
import { useFetchAllMembers } from './hooks/useFetchAllMembers';
import * as S from '../../HomeStack.styles';
import Bottom from './units/Bottom/Bottom';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import Menu from './units/Menu/Menu';
import Item from './units/Item/Item';
import Lock from './units/Lock/Lock';
import useMemberStore from '../../../../commons/store/useMemberStore';
import { EMemberStatus } from '../../../../commons/types/memberStatus';
import usePushNotifications from '../../../../commons/hooks/usePushNotifications';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import Header from './units/Header/Header';
import { RefreshControl } from 'react-native';
import useScreenLogger from '../../../../commons/hooks/useAnalyticsScreenLogger';
import useAnalyticsEventLogger from '../../../../commons/hooks/useAnalyticsEventLogger';

const Home = () => {
  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });
  usePushNotifications();
  const [filter, setFilter] = useState(initStates);
  const [selectedFilter, setSelectedFilter] = useState<TFilterKeys>('gender');
  const { bottomRef, handleOpenBottomSheet, useBackHandler } = useBottomSheet();
  const { data, refreshing, setPage, onReset, onRefresh, onNextPage } = useFetchAllMembers(filter);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const dataLength = data.length;
  const snapPoints = useMemo(() => ['40%', '60%'], []);
  const logEvent = useAnalyticsEventLogger();
  const handlePresentModalPress = (filterKey: TFilterKeys) => () => {
    setSelectedFilter(filterKey);
    logEvent('filter_click', { key: filterKey });
    handleOpenBottomSheet();
  };

  return (
    <>
      <S.Wrapper>
        <Menu
          handlePresentModalPress={handlePresentModalPress}
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
          onReset={onReset}
        />
        <S.PositionedWrapper>
          {dataLength > 0 && (
            <>
              {EMemberStatus.MATCHING_DISABLED === memberStatus && <Lock />}
              <S.ContentWrapper
                data={data}
                renderItem={({ item, index }: { item: IDdata; index: number }) => (
                  <Item item={item} index={index} dataLength={dataLength} data={data} />
                )}
                refreshing={onReset}
                keyExtractor={(item: IDdata, index: number) => `${item.memberId}-${index}`}
                onEndReached={onNextPage}
                onEndReachedThreshold={0.2}
                removeClippedSubviews
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              />
            </>
          )}
        </S.PositionedWrapper>
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
            setPage={setPage}
            onReset={onReset}
          />
        }
      />
    </>
  );
};

export default Home;
