import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { icons } from '../../../../../../commons/utils/variablesImages';
import { TFilterKeys } from '../../../../HomeStack.types';
import * as S from './Bottom.styles';
import { IProps } from './Bottom.types';

const filterData: Record<TFilterKeys, string[]> = {
  gender: ['성별', '남성', '여성'],
  smoking: ['흡연 여부', '비흡연', '흡연'],
  drinking: ['음주 여부', '음주 X', '월 1~2회', '주 1회', '주 2회 이상', '매일'],
  contact: ['연락 스타일', '느긋이', '칼답'],
  dating: ['데이트 스타일', '집 데이트', '야외 데이트'],
};

const Bottom = ({ filter, setFilter, selectedFilter }: IProps) => {
  const defaultOption = filterData[selectedFilter][0];
  const isSelectedDefault = filter[selectedFilter] === defaultOption;
  const options = filterData[selectedFilter].slice(1);

  const handleSelectDefault = () => {
    setFilter({ ...filter, [selectedFilter]: defaultOption });
  };

  const handleSelectOption = (option: string) => {
    setFilter({ ...filter, [selectedFilter]: option });
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
