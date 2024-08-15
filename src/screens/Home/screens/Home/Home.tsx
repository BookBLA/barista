import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { initStates } from '@screens/Home/HomeStack.constants';
import * as S from '@screens/Home/HomeStack.styles';
import { IDdata, TFilterKeys } from '@screens/Home/HomeStack.types';
import React, { useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useFetchAllMembers } from './hooks/useFetchAllMembers';
import Bottom from './units/Bottom/Bottom';
import Header from './units/Header/Header';
import Item from './units/Item/Item';
import Lock from './units/Lock/Lock';
import Menu from './units/Menu/Menu';

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
