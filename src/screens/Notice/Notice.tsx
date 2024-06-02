import { Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import * as S from './Notice.styles';
import { colors } from '../../commons/styles/variablesStyles';
import Close from '../../../assets/images/icons/close.png';
import useHeaderControl from '../../commons/hooks/useHeaderControl';
import useMovePage from '../../commons/hooks/useMovePage';
import { IAlarmData, useGetAlarms } from '../../commons/hooks/useGetAlarms';
import { useDeleteAlarm } from './hooks/useDeleteAlarm';

const Notice = () => {
  const { handleReset } = useMovePage();
  useHeaderControl({
    title: '설정',
    onPressLeft: () => handleReset('tapScreens'),
  });
  const { data, setData } = useGetAlarms();
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

  return (
    <S.Wrapper>
      <TouchableOpacity>
        <CustomText margin="0 0 10px" onPress={() => onClickDeleteAlarm(null)}>
          전체 삭제
        </CustomText>
      </TouchableOpacity>
      <S.ScrollWrapper>
        {data.map((el: IAlarmData, dex) => (
          <S.NoticeWrapper key={dex}>
            <CustomText>{el.title}</CustomText>
            <CustomText margin="6px 0 20px" size="12px" font="fontRegular" color={colors.textGray4}>
              {el.body}
            </CustomText>
            <S.BottomWrapper>
              <CustomText size="12px" color={colors.textGray2} font="fontSemiBold">
                YY.MM.DD
              </CustomText>
              <TouchableOpacity onPress={() => onClickDeleteAlarm(String(el.memberPushAlarmId))}>
                <Image source={Close} />
              </TouchableOpacity>
            </S.BottomWrapper>
          </S.NoticeWrapper>
        ))}
      </S.ScrollWrapper>
    </S.Wrapper>
  );
};

export default Notice;
