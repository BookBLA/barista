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

export const ContentWrapper = styled.FlatList`
  display: flex;
  flex-wrap: wrap;
  width: ${deviceWidth}px;
`;

export const PositionedWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 85%;
  background-color: ${colors.background};
  border-radius: 20px 20px 0px 0px;
`;

export const BodyWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
  border-radius: 20px 20px 0px 0px;
`;
