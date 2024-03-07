import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';
import { deviceWidth } from '../../commons/utils/dimensions';

export const Wrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const RowStyled = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px 20px 0px 20px;

  justify-content: space-between;
`;

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 20px 20px 0px 20px;
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
  font-family: 'fontMedium';
`;

export const MenuWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 20px;
`;

export const MenuTitle = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  margin-bottom: 8px;
`;

export const FilterWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
  /* height: 20px; */
  margin-bottom: 19px;
`;

export const FilterBox = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 30px;
  margin-right: 6px;
  padding: 8px 10px;
  background-color: ${colors.buttonMain};
  color: red;
`;

export const FilterText = styled.Text`
  font-size: 12;
  font-family: 'fontRegular';
`;

export const FilterImage = styled.Image`
  width: 14px;
  height: 14px;
`;

export const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: center;
`;

export const IconImage = styled.Image`
  width: 21px;
  height: 21px;
`;

export const IconText = styled.Text`
  font-size: 16px;
  font-family: 'fontExtrLight';
`;

export const ContentWrapper = styled.ScrollView`
  display: flex;
  flex-wrap: wrap;
  width: ${deviceWidth}px;
  color: #f7f4ed;
`;

export const ProfileWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* align-items: center; */
  width: 46%;
  height: 236px;
  padding: 5px 6px 0px 6px;
  background-color: #fff;
  margin: 0 4px;
`;

export const Line = styled.View`
  width: ${deviceWidth}px;
  border-width: 12px;
  border-color: #f1ead5;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: 175px;
  object-fit: contain;
`;
