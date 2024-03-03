import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const InfoTextStyled = styled.Text`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${colors.textGray};
`;

export const InfoViewStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 16px;
`;

export const ViewStyled = styled.View`
  display: flex;
  background: #f7f4ed;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 48px;
`;

export const PressableStyled = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 40px;
  border-radius: 40px;
  margin: 0 16px;
  height: 40px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PressableTextStyled = styled.Text`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #4a4a4a;
`;

export const postcardCountViewStyled = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const postcardCountTextStyled = styled.Text`
  font-size: 18px;
`;

export const receivedPostcardViewStyled = styled.View`
  flex: 1;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  background: #d9d9d9;
  border-radius: 8px;
  margin-right: ${({ index }: any) => (index % 2 === 0 ? '5px' : 0)};
  margin-left: ${({ index }: any) => (index % 2 !== 0 ? '5px' : 0)};
`;

export const sendPostcardViewStyled = styled.View`
  height: 140px;
  margin-bottom: 10px;
`;

export const ListWrapper = styled.View`
  margin-top: 10px;
`;
