import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { initStates } from '@screens/Home/HomeStack.constants';
import { TFilterKeys, TFilterState } from '@screens/Home/HomeStack.types';
import { useMemo } from 'react';
import * as S from './Menu.styles';
import { IProps } from './Menu.types';

const Menu = ({ handlePresentModalPress, filter, setFilter, onReset }: IProps) => {
  const isFilterChanged = useMemo(() => {
    return Object.keys(filter).some((key) => {
      const filterKey = key as TFilterKeys;
      return filter[filterKey] !== initStates[filterKey];
    });
  }, [filter]);

  return (
    <S.MenuWrapper>
      <CustomText margin="0 0 8px">서재 구경하기</CustomText>
      <S.FilterWrapper horizontal>
        {isFilterChanged && (
          <S.FilterBox
            onPress={() => {
              setFilter({ ...initStates });
              onReset();
            }}
            isSelect
          >
            <S.FilterImage source={icons.reset} />
            <CustomText size="12px" font="fontRegular">
              초기화
            </CustomText>
          </S.FilterBox>
        )}

        {Object.keys(filter).map((key) => {
          const filterKey = key as keyof TFilterState;
          return (
            <S.FilterBox
              key={key}
              onPress={handlePresentModalPress(filterKey)}
              isSelect={filter[filterKey] === initStates[filterKey]}
            >
              <CustomText size="12px" font="fontRegular">
                {filter[filterKey]}
              </CustomText>
              <S.FilterImage source={icons.bottomArrow} />
            </S.FilterBox>
          );
        })}
      </S.FilterWrapper>
    </S.MenuWrapper>
  );
};

export default Menu;
