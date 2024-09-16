import styled from 'styled-components/native';
import { ProductContentContainerProps } from './Product.types';

export const ProductContentContainer = styled.View<ProductContentContainerProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props: { index: number; admobCount: number; }) => (props.index === 0 && props.admobCount === 0 ? 'transparent' : 'white')};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 9px;
  border-color: ${(props: { index: number; }) => (props.index === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.05)')};
  border-width: 1px;
  opacity: ${(props: { index: number; admobCount: number; }) => (props.index === 0 && props.admobCount === 0 ? 0.4 : 1)};
`;

export const ProductInfoContainer = styled.View`
  flex-direction: row;
  width: 50%;
  height: 90%;
  align-items: center;
`;