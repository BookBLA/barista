import styled from 'styled-components/native';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../commons/styles/variablesStyles';
import { deviceHeight, deviceWidth } from '../../commons/utils/dimensions';

export const HeaderView = styled.View`
  flex-direction: row;
  width: 100%;
  color: white;
  justify-content: center;
  padding: 16px 0;
  ${Platform.select({
    ios: `
      margin: 8px 0;
    `,
    android: `
      margin: 26px 0;
    `,
  })}
`;

export const HeaderImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -3px;
  right: 14px;
`;

export const HeaderTextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const HeaderText = styled.Text`
  font-family: fontMedium;
`;

export const UserInfoContainerView = styled.View`
  margin: 16px 16px;
`;

export const UserInfoView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const UserInfoWrapper = styled.View`
  flex: 4;
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
  font-size: 20px;
  color: ${colors.textBlack};
  margin-bottom: 4px;
  font-family: fontMedium;
`;

export const SchoolNameText = styled.Text`
  font-size: 14px;
  color: #858585;
  font-family: fontLight;
`;

export const CircularImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const ProfileImageModificationImage = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 38px;
  top: 40px;
`;

export const ProfileModifyButtonContainer = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 20px;
  background-color: #f0e7cf;
`;

export const ProfileModifyButtonText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${colors.textBlack};
  font-family: fontMedium;
`;

export const BookListContainerView = styled.View`
  height: 100%;
  background-color: #f7f4ed;
`;

export const BookContainer = styled.View``;

export const BookShelves = styled.View`
  width: ${deviceWidth}px;
  border: 5px solid #ffffff;
`;

export const styles: any = StyleSheet.create({
  Shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export const ModalBookListContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 45px;
  padding-right: 40px;
  padding-left: 40px;
  gap: 40px;
`;

export const BookTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BookImage = styled.Image`
  width: 90%;
  height: ${deviceHeight / 4 - 40}px;
  border-radius: 10px;
`;

export const EmptyBookImage = styled.View`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: ${deviceHeight / 4 - 40}px;
  border-radius: 10px;
  background-color: #49526e;
`;

export const EmptyBookPlusImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const BookMarkIconImage = styled.Image`
  width: 15px;
  height: 30px;
  position: absolute;
  left: ${deviceWidth / 3.8}px;
  top: ${deviceHeight / 500 - 5}px;
`;

export const ProfileImageBottomSheetContainer = styled.View`
  margin: 4px 20px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

export const ProfileImageModificationButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px ${colors.textGray1} solid;
  border-radius: 10px;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
`;

export const BookModificationBottomSheetContainer = styled.View`
  margin: 4px 8px;
  padding: 16px;
`;
