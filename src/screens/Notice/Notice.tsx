import Close from '@assets/images/icons/close.png';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useGetAlarms } from '@commons/hooks/notifications/getAlarms/useGetAlarms';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { colors } from '@commons/styles/variablesStyles';
import { MemberPushAlarmReadResponse } from '@commons/types/openapiGenerator';
import { formatDate } from '@commons/utils/dates/dateUtils/dateUtils';
import { ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import * as S from './Notice.styles';
import { useDeleteAlarm } from './hooks/useDeleteAlarm';
import { Warning } from './units/Warning/Warning';

const Notice = () => {
  useScreenLogger();
  const { handleReset } = useMovePage();
  useHeaderControl({
    title: '알림',
    onPressLeft: () => handleReset('tapScreens'),
  });
  const { data, setData, fetchAlarms, page, loading, hasNextPage } = useGetAlarms();
  const { callDeleteAlarm } = useDeleteAlarm();

  const onClickDeleteAlarm = async (memberPushAlarmId?: string | null) => {
    try {
      await callDeleteAlarm(memberPushAlarmId ?? null);
      if (memberPushAlarmId) {
        const filterData = data.filter((el) => String(el.memberPushAlarmId) !== memberPushAlarmId);
        setData([...filterData]);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }: { item: MemberPushAlarmReadResponse }) => (
    <S.NoticeWrapper>
      <CustomText>{item.title}</CustomText>
      <CustomText margin="6px 0 20px" size="12px" font="fontRegular" color={colors.textGray4}>
        {item.body}
      </CustomText>
      <S.BottomWrapper>
        <CustomText size="12px" color={colors.textGray2} font="fontSemiBold">
          {formatDate(item.createdAt)}
        </CustomText>
        <TouchableOpacity onPress={() => onClickDeleteAlarm(String(item.memberPushAlarmId))}>
          <Image source={Close} />
        </TouchableOpacity>
      </S.BottomWrapper>
    </S.NoticeWrapper>
  );

  const loadMoreData = () => {
    if (!loading && hasNextPage) {
      fetchAlarms(page + 1); // Fetch next page
    }
  };

  return (
    <S.Wrapper>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <TouchableOpacity style={{ width: '25%' }}>
                <CustomText
                  margin="60px 0 10px 16px"
                  font="fontRegular"
                  size="14px"
                  onPress={() => onClickDeleteAlarm(null)}
                >
                  전체 삭제
                </CustomText>
              </TouchableOpacity>
              <FlatList
                data={data}
                renderItem={renderItem}
                onEndReached={loadMoreData} // Infinite scroll
                onEndReachedThreshold={0.1} // Trigger fetch when 10% from the bottom
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ paddingHorizontal: 16, height: 'auto' }}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color={colors.primary} /> : null} // Optional loading indicator
              />
            </>
          ) : (
            <Warning />
          )}
        </>
      )}
    </S.Wrapper>
  );
};

export default Notice;
