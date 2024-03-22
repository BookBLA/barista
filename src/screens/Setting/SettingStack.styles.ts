import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ProfileWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px 20px;
`;

export const LeftWrapper = styled.View`
  width: 60px;
  height: 60px;
  margin-right: 8px;
  border-radius: 50px;
  background-color: #d9d9d9;
`;

export const ProfileImage = styled.Image``;

export const RightWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const MenuWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  margin: 0 20px;
  padding: 0 14px;
  border-radius: 10px;
  background-color: ${colors.background};
`;

export const MenuButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MenuImage = styled.Image`
  width: 36px;
  height: 30px;
  margin-bottom: 10px;
  object-fit: contain;
`;

export const Line = styled.View`
  margin-top: 20px;
  border-width: 6px;
  border-color: #fafafa;
`;

export const BottomWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

export const BetweenWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RowWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
