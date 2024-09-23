import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const BackWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled.View`
  width: ${deviceWidth - 32}px;
  height: 234px;

  padding: 20px 16px;

  border-radius: 15px;
  border-color: ${colors.textGray};
  background-color: white;
`;

export const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  width: 40px;
  height: 40px;
`;

export const CoinImage = styled.Image`
  width: 100%;
  height: 100%;

  object-fit: fill;
`;

export const ButtonWrapper = styled.View`
  margin-top: auto;
`;
