import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { Platform, StyleSheet } from 'react-native';
import { deviceWidth } from '../../../../commons/utils/dimensions';

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

export const ModalUserInfoViewStyled = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 6px 16px;
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
  font-family: 'fontMedium';
  color: ${colors.textBlack};
  margin-bottom: 4px;
  font-weight: 500;
`;

export const SchoolNameText = styled.Text`
  font-size: 12px;
  font-family: 'fontLight';
  color: #858585;
  margin-bottom: 8px;
`;

export const ModalSchoolNameText = styled.Text`
  font-size: 14px;
  font-family: 'fontLight';
  color: #858585;
  margin-bottom: 8px;
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
  padding: 10px;
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
  font-size: 14px;
`;

export const ModalBookListContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 14px;
  padding: 0 16px;
`;

export const ModalBookWrapper = styled.View`
  width: 30%;
`;

export const ModalBookShelves = styled.View`
  margin: 0 0 16px;
  border: 6px solid #f1ead5;
`;

export const ModalBookImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 10px;
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

export const ModifyAnswerTextInput = styled.TextInput.attrs({
  multiline: true,
  maxLength: 100,
})`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  height: 100px;
  width: ${deviceWidth - 64};
  background-color: ${colors.buttonMain};
`;
