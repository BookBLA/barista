import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  background-color: #fff;
  padding: 0px 16px;
`;

export const LogoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 4px;
  object-fit: fill;
`;

export const LogoTitleImage = styled.Image`
  width: 120px;
  height: 23px;
  object-fit: fill;
`;

export const LogoTitle = styled.Text`
  font-size: 24px;
  font-weight: 500;
  font-family: 'fontMedium';
`;

export const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconButton = styled.TouchableOpacity``;

export const IconImage = styled.Image`
  width: 21px;
  height: 21px;
`;

export const IconText = styled.Text`
  font-size: 16px;
  font-family: 'fontExtraLight';
  margin-right: 8px;
`;
