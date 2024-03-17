import * as S from './CustomText.styles';
import { IProps } from './CustomText.types';

export const CustomText: React.FC<IProps> = ({ children, size, color, font, weight, margin, style }) => {
  return (
    <S.CustomText size={size} color={color} font={font} weight={weight} margin={margin} style={style}>
      {children}
    </S.CustomText>
  );
};
