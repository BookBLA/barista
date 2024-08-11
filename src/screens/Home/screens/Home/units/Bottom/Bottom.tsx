import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import useAnalyticsEventLogger from '../../../../../../commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import { icons } from '../../../../../../commons/utils/ui/variablesImages/variablesImages';
import { filterData } from '../../../../HomeStack.constants';
import * as S from './Bottom.styles';
import { IProps } from './Bottom.types';

const Bottom = ({ filter, setFilter, selectedFilter, useBackHandler, setPage, onReset }: IProps) => {
  useBackHandler(true);
  const defaultOption = filterData[selectedFilter][0];
  const isSelectedDefault = filter[selectedFilter] === defaultOption;
  const options = filterData[selectedFilter].slice(1);
  const logEvent = useAnalyticsEventLogger();

  const handleSelectDefault = () => {
    setFilter({ ...filter, [selectedFilter]: defaultOption });
    onReset();
  };

  const handleSelectOption = (option: string) => {
    setFilter({ ...filter, [selectedFilter]: option });
    logEvent('filter_select', { value: option });
    onReset();
  };

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <CustomText size="20px" font="fontSemiBold">
          {defaultOption}
        </CustomText>
      </S.TopWrapper>
      <S.SelectWrapper onPress={handleSelectDefault}>
        <CustomText font={isSelectedDefault ? 'fontBold' : 'fontRegular'}>전체</CustomText>
        {isSelectedDefault && <S.CheckImage source={icons.check} />}
      </S.SelectWrapper>
      {options.map((option, index) => (
        <S.SelectWrapper key={index} onPress={() => handleSelectOption(option)}>
          <CustomText font={filter[selectedFilter] === option ? 'fontBold' : 'fontRegular'}>{option}</CustomText>
          {filter[selectedFilter] === option && <S.CheckImage source={icons.check} />}
        </S.SelectWrapper>
      ))}
    </S.Wrapper>
  );
};

export default Bottom;
