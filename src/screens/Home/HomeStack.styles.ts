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

// TODO: 성진 - FlatList로 변경 예정
export const ContentWrapper = styled.FlatList`
  display: flex;
  flex-wrap: wrap;
  width: ${deviceWidth}px;
  background-color: ${colors.background};
  border-radius: 20px 20px 0px 0px;
`;

export const PositionedWrapper = styled.View`
  position: relative;
  height: 85%;
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
