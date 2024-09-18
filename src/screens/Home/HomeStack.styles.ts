import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 64px 16px 20px;
`;

export const ContentWrapper = styled.FlatList`
  display: flex;
  flex-wrap: wrap;
  width: ${deviceWidth}px;
`;

export const PositionedWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 85%;
  /* background-color: ${colors.background};  */
  border-radius: 20px 20px 0 0;
`;

export const BodyWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 30;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
  border-radius: 20px 20px 0 0;
`;
