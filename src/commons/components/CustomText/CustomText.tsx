import { IProps } from './CustomText.Types';
import * as S from './CustomText.styles';

export const CustomText: React.FC<IProps> = ({ children, size, color, font, weight, margin }) => {
  return (
    <S.Wrapper margin={margin}>
      <S.CustomText size={size} color={color} font={font} weight={weight}>
        {children}
      </S.CustomText>
    </S.Wrapper>
  );
};
