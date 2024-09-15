import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${deviceWidth - 32}px;
  height: 291px;

  padding: 28px 16px 16px;
`;

export const CoinWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ImageWrapper = styled.View`
  width: 79px;
  height: 79px;
`;

export const UpdateImage = styled.Image`
  width: 100%;
  height: 100%;

  object-fit: fill;
`;

export const ButtonWrapper = styled.View`
  width: 100%;

  margin-top: auto;
`;
