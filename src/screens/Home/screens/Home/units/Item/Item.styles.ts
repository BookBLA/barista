import styled from 'styled-components/native';
import { deviceWidth } from '../../../../../../commons/utils/dimensions';

export const RowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 20px 0px 16px;
  justify-content: space-between;
`;

export const Line = styled.View`
  width: ${deviceWidth}px;
  border-width: 5px;
  border-color: #f1ead5;
`;
