import backArrow from '../../../../../assets/images/icons/Back.png';
import { Image } from 'react-native';
import { ICustomHeader } from './CustomHeader.types';
import * as S from './CustomHeader.styles';
import useMovePage from '../../../hooks/navigations/movePage/useMovePage';
import { useHasMargin } from '../../../store/ui/hasMargin/useHasMargin';
import { CustomText } from '../../Utils/TextComponents/CustomText/CustomText.styles';

export const CustomHeader: React.FC<ICustomHeader> = ({ title, left = true, onPressLeft, right, free }) => {
  const { movePage } = useMovePage();
  const hasMargin = useHasMargin((state) => state.hasMargin);

  return (
    <>
      {free ? (
        <>{free}</>
      ) : (
        <S.Wrapper hasMargin={hasMargin}>
          {left && (
            <S.Button onPress={onPressLeft ? onPressLeft : movePage()}>
              <Image source={backArrow} style={{ width: 24, height: 24 }} />
            </S.Button>
          )}
          <S.CenterWrapper left={left}>
            <CustomText size="14px" margin="12px 0 ">
              {title}
            </CustomText>
          </S.CenterWrapper>
          {right && (
            <S.Button onPress={right?.onPress}>
              <S.IconImage source={right?.image} />
            </S.Button>
          )}
        </S.Wrapper>
      )}
    </>
  );
};
