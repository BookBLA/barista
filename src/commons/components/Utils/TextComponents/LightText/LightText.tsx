import { IProps } from './LightText.types';
import * as S from './LightText.styles';

export const LightText: React.FC<IProps> = ({ children, size, color, weight, margin }) => {
  return (
    <S.LightText size={size} color={color} weight={weight} margin={margin}>
      {children}
    </S.LightText>
  );
};
