import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';
import { deviceWidth } from '../../commons/utils/dimensions';

export const Wrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const RowStyled = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 20px 0px 16px;
  justify-content: space-between;
`;

export const ContentWrapper = styled.ScrollView`
  display: flex;
  flex-wrap: wrap;
  width: ${deviceWidth}px;
  background-color: ${colors.background};
`;

export const Line = styled.View`
  width: ${deviceWidth}px;
  border-width: 12px;
  border-color: #f1ead5;
`;

export const PositionedOverlay = styled.View`
  position: relative;
  height: 77%;
`;

export const BodyWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 91%;
  background-color: ${colors.background};
`;