import { IProps } from './CustomText.Types';
import * as S from './CustomText.styles';

export const CustomText: React.FC<IProps> = ({ children, size, color, font, weight }) => {
  return (
    <S.CustomText size={size} color={color} font={font} weight={weight}>
      {children}
    </S.CustomText>
  );
};
