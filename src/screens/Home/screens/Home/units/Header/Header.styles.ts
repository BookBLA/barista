import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  padding: 0px 16px;
  margin-bottom: 16px;
  background-color: '#1D2E61';
`;

export const LogoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 26px;
  height: 26px;
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

export const IconButton = styled.TouchableOpacity`
  margin-left: 2px;
  margin-right: 3px;
`;

export const IconImage = styled.Image`
  width: 24px;
  height: 24px;
`;
