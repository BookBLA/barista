import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';

export const ContainerViewStyled = styled.View`
  color: white;
  height: 100%;
`;

export const UserInfoViewStyled = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserInfoWrapper = styled.View`
  flex: 4;
  padding: 0 8px;
`;

export const UserInfoNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GenderIconStyled = styled.Image`
  width: 20px;
  height: 20px;
`;

export const UserNameText = styled.Text`
  font-size: 16px;
  color: ${colors.textBlack};
  margin-bottom: 4px;
`;

export const SchoolNameText = styled.Text`
  font-size: 12px;
  color: #858585;
  margin-bottom: 4px;
`;

export const BookInfoText = styled.Text`
  font-size: 14px;
  color: #787878;
`;

export const CircularImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const ButtonContainerViewStyled = styled.View`
  flex-direction: row;
`;

export const dashLineViewStyled = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  border: 1px dashed #d2d6e2;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  padding: 6px;
  border-radius: 10px;
  margin-right: ${(props: any) => (props.left ? '4px' : 0)};
  margin-left: ${(props: any) => (props.right ? '4px' : 0)};
  background-color: ${(props: any) => props.backgroundColor ?? 'black'};
`;

export const SingleButtonContainer = styled(ButtonContainer)`
  flex: ${(props: any) => props.flex ?? 0.5};
  margin-left: auto;
`;

export const ButtonText = styled.Text`
  color: ${(props: any) => props.fontColor ?? 'white'};
  text-align: center;
  font-size: 16px;
`;
