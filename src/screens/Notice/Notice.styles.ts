import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';
import { Warning } from './units/Warning/Warning';

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

export const WarningWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const WarningImgWrapper = styled.View`
  width: 51px;
  height: 51px;
  border-radius: 50%;
`;

export const WarningImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
