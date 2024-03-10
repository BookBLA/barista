import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const ScrollWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

export const NoticeWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 12px;
  background-color: ${colors.background};
`;

export const BottomWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
