import styled from 'styled-components/native';
import { ProductContentContainerProps } from './Product.types';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@commons/styles/variablesStyles';

export const ProductContentContainer = styled.View<ProductContentContainerProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props: { index: number; admobCount: number }) =>
    props.index === 0 && props.admobCount === 0 ? 'transparent' : 'white'};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 9px;
  border-color: transparent;
  border-width: 1px;
  opacity: ${(props: { index: number; admobCount: number }) => (props.index === 0 && props.admobCount === 0 ? 0.4 : 1)};
`;

export const ProductInfoContainer = styled.View`
  flex-direction: row;
  width: 58%;
  height: 90%;
  align-items: center;
`;

export const BookMarkImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 10%;
  object-fit: cover;
`;

export const ProductTextContainer = styled.View`
  width: 70%;
  height: 80%;
`;

export const GradientButton = styled(LinearGradient).attrs({
  colors: ['#5B247A', '#1BCEDF'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  object-fit: contain;
  border-radius: 50px;
  overflow: hidden;
`;

export const BuyButton = styled.TouchableOpacity`
  padding: 10px 20px;
  width: 95px;
  height: auto;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const BuyButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textYellow};
`;
