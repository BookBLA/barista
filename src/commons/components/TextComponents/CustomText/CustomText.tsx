import * as S from './CustomText.styles';
import { IProps } from './CustomText.types';

export const CustomText: React.FC<IProps> = ({ children, size, color, font, weight, margin }) => {
  return (
    <S.CustomText size={size} color={color} font={font} weight={weight} margin={margin}>
      {children}
    </S.CustomText>
  );
};
