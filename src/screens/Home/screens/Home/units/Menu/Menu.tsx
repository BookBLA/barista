import { useMemo } from 'react';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { useLogout } from '../../../../../../commons/hooks/useLogout';
import { icons } from '../../../../../../commons/utils/variablesImages';
import { initStates } from '../../../../HomeStack.constants';
import { TFilterKeys, TFilterState } from '../../../../HomeStack.types';
import * as S from './Menu.styles';
import { IProps } from './Menu.types';

const Menu = ({ handlePresentModalPress, filter, setFilter }: IProps) => {
  const { onClickLogout } = useLogout();

  const isFilterChanged = useMemo(() => {
    return Object.keys(filter).some((key) => {
      const filterKey = key as TFilterKeys;
      return filter[filterKey] !== initStates[filterKey];
    });
  }, [filter]);

  return (
    <S.MenuWrapper>
      <CustomText margin="0 0 8px" onPress={onClickLogout}>
        서재 구경하기
      </CustomText>
      <S.FilterWrapper horizontal={true}>
        {isFilterChanged && (
          <S.FilterBox onPress={() => setFilter({ ...initStates })} isSelect={true}>
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
