import backArrow from '@assets/images/icons/Back.png';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import { Image } from 'react-native';
import * as S from './CustomHeader.styles';
import { ICustomHeader } from './CustomHeader.types';

export const CustomHeader: React.FC<ICustomHeader> = ({ title, left = true, onPressLeft, right, customContent }) => {
  const { movePage } = useMovePage();
  const hasMargin = useAppStatus((state) => state.status.hasMargin);
  const backgroundColor = useAppStatus((state) => state.status.isBackgroundColor);

  return (
    <>
      {customContent ? (
        <>{customContent}</>
      ) : (
        <S.Wrapper hasMargin={hasMargin} backgroundColor={backgroundColor}>
          {left && (
            <S.Button onPress={onPressLeft ? onPressLeft : movePage()}>
              <Image source={backArrow} style={{ width: 24, height: 24 }} />
            </S.Button>
          )}
          <S.CenterWrapper left={left}>
            <CustomText size="14px" margin="12px 0 " color={backgroundColor === '#fff' ? 'black' : 'white'}>
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
