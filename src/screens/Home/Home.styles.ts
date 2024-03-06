import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* padding: 15px 20px 0;  */
`;

export const TopWrapper = styled.View`
  padding: 20px 20px 0px 20px;
`;

export const RowStyled = styled.View`
  display: flex;
  flex-direction: row;
`;

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
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
`;

export const LogoTitle = styled.Text`
  font-size: 24px;
  font-weight: 500;
  font-family: fontMedium;
`;

export const MenuWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

export const MenuTitle = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  margin-bottom: 8px;
`;

export const FilterWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
  margin-bottom: 19px;
`;

export const FilterBox = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 30px;
  margin-right: 6px;
  padding: 8px 10px;
  background-color: ${colors.secondary};
  color: red;
`;

export const FilterText = styled.Text`
  font-size: 12;
  font-family: fontRegular;
`;

export const FilterImage = styled.Image`
  width: 14px;
  height: 14px;
`;

export const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconImage = styled.Image`
  width: 21px;
  height: 21px;
`;

export const IconText = styled.Text`
  font-size: 16px;
  font-family: fontExtrLight;
`;

export const ContentWrapper = styled.ScrollView`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: red;
  padding: 20px;
`;

export const ProfileWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 162px;
  height: 236px;
  padding: 5px 6px 0px 6px;
  background-color: #fff;
  margin: 0 4px;
`;

export const Line = styled.View`
  border-width: 12px;
  border-color: #000;
`;

export const BookImage = styled.Image`
  width: 150px;
  height: 175px;
  object-fit: contain;
`;
