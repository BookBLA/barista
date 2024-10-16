import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
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

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50px;
`;

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
  padding: 0 25px;
  border-radius: 10px;
  background-color: ${colors.background};
`;

export const MenuButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MenuImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
  object-fit: fill;
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

export const MatchWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
`;

export const RowWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ModalWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 26px 20px 0px;
`;

export const DeleteWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0px 16px 12px;
`;

export const CheckBoxImage = styled.Image`
  width: 20px;
  height: 20px;
  object-fit: fill;
`;

export const TextWrapper = styled.View`
  margin-left: 4px;
`;
