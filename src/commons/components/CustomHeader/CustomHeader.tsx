import backArrow from '../../../../assets/images/icons/Back.png';
import useMovePage from '../../hooks/useMovePage';
import { Image } from 'react-native';
import { CustomText } from '../TextComponents/CustomText/CustomText';
import { ICustomHeader } from './CustomHeader.types';
import * as S from './CustomHeader.styles';
import { useHasMargin } from '../../store/useHasMargin';

export const CustomHeader: React.FC<ICustomHeader> = ({ title, left = true, onPressLeft, right }) => {
  const { movePage } = useMovePage();
  const hasMargin = useHasMargin((state) => state.hasMargin);

  return (
    <S.Wrapper hasMargin={hasMargin}>
      {left && (
        <S.Button onPress={onPressLeft ? onPressLeft : movePage}>
          <Image source={backArrow} style={{ width: 24, height: 24 }} />
        </S.Button>
      )}
      <S.CenterWrapper left={left}>
        <CustomText size="14px" margin="16px 0">
          {title}
        </CustomText>
      </S.CenterWrapper>
      {right && (
        <S.Button onPress={right?.onPress}>
          <S.IconImage source={right?.image} />
        </S.Button>
      )}
    </S.Wrapper>
  );
};
