import { colors } from '@commons/styles/variablesStyles';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { Platform, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const UserInfoContainerView = styled.View`
  margin: 24px 16px;
`;

export const UserInfoView = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const UserInfoWrapper = styled.View`
  flex: 4;
`;

export const InviteFriendButtonWrapper = styled.View``;

export const InviteFriendButtonImage = styled.Image`
  width: 29px;
  height: 29px;
`;

export const UserInfoNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GenderIconStyled = styled.Image`
  width: 20px;
  height: 20px;
`;

export const UserNameText = styled.Text`
  font-size: 22px;
  color: ${colors.textWhite};
  font-family: fontMedium;
`;

export const SchoolNameText = styled.Text`
  font-size: 14px;
  margin-top: 8px;
  color: ${colors.textWhite};
  font-family: fontLight;
`;

export const MemberStyleList = styled.View`
  margin-top: 12px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

export const MemberStyleView = styled.View`
  align-items: center;
  justify-content: center;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  padding: 8px 16px;
`;

export const CircularImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: 10px;
  background-color: #e9e9e9;
`;

export const OverlayImage = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 18px;
  top: 20px;
`;

export const ProfileImageModificationImage = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 40px;
  top: 40px;
`;

export const BookListContainerView = styled.View`
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const BookContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  color: #f0f0f0;
`;

export const BookFloorWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: -2px;
  z-index: 2;
`;

export const BookShelvesTop = styled.View`
  width: ${deviceWidth * 0.95}px; /* 선반의 너비를 화면의 80%로 설정 */
  height: 0px; /* 높이는 0으로 설정하고 border로 높이를 생성 */
  border-bottom-width: 12px; /* 사다리꼴의 높이 */
  border-left-width: 20px; /* 사다리꼴 왼쪽 기울기 */
  border-right-width: 20px; /* 사다리꼴 오른쪽 기울기 */
  border-style: solid;
  border-bottom-color: #e0e0e0; /* 선반의 색상 */
  border-left-color: transparent; /* 투명한 색상으로 설정 */
  border-right-color: transparent; /* 투명한 색상으로 설정 */
  align-self: center; /* 중앙 정렬 */
  margin-top: -3px; /* 약간 위로 이동 */
  z-index: 1;
  position: relative;
`;

export const BookShelves = styled.View`
  justify-content: center;
  align-self: center;
  width: ${deviceWidth * 0.95}px;
  border: 5px solid #ffffff;
`;

export const styles: any = StyleSheet.create({
  Shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  AddBookButton: {
    position: 'absolute',
    bottom: 12,
    right: 5,
    margin: 0,
    padding: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export const BookTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BookImage = styled.Image`
  width: 70%;
  height: ${deviceHeight / 4 - 50}px;
  border-radius: 10px;
  object-fit: fill;
`;

export const EmptyBookImage = styled.View`
  justify-content: center;
  align-items: center;
  width: 70%;
  height: ${deviceHeight / 4 - 50}px;
  border-radius: 10px;
  background-color: #49526e;
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

export const BookModificationBottomSheetContainer = styled.View``;

export const EmptyPostcardModalWrapper = styled.View`
  padding: 16px 14px;
`;

export const EmptyPostcardModalHeader = styled.View`
  margin-bottom: 20px;
`;

export const InviteFriendModalWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
`;

export const InviteFriendModalHeader = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalBottomWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
`;

export const RoundButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 14px 20px;
  border-radius: 60px;
  background-color: ${({ bgColor }: any) => bgColor || colors.primary};
`;

export const FriendInvitationCode = styled.View`
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 96px;
  background-color: #ecf0f9;
  border-radius: 6px;
  margin-bottom: 20px;
`;

export const CopyCodeButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const CopyCodeButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 14px 109px;
  border-radius: 4px;
  background-color: ${({ bgColor }: any) => bgColor || colors.primary};
  margin-bottom: 20px;
`;

export const AddBookButton = styled.Image`
  width: 54px;
  height: 54px;
  align-content: center;
  justify-content: center;
`;
