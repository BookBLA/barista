import styled from 'styled-components/native';
import { IModalConfig } from '../CustomModal.types';

export const TopWrapper = styled.View`
  width: 100%;
  height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: ${({ title }: Pick<IModalConfig, 'title'>) => (title ? 'space-between' : 'flex-end')};
  padding: 20px;
`;

export const CloseButton = styled.Image`
  width: 18px;
  height: 18px;
`;
