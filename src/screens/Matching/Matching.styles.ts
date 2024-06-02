import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';
import { Platform, StyleSheet } from 'react-native';

export const Wrapper = styled.View`
  flex: 1;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;
`;

export const InfoTextStyled = styled.Text`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${colors.textGray};
  font-family: fontMedium;
`;

export const InfoViewStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
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
  border-radius: 40px;
  margin: 0 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  ${Platform.select({
    android: `
      elevation: 5;
    `,
  })}
`;

export const PressableTextStyled = styled.Text`
  font-weight: 500;
  font-family: fontMedium;
  text-align: center;
  color: #4a4a4a;
  align-items: center;
  justify-content: center;
`;

export const postcardCountViewStyled = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const postcardCountTextStyled = styled.Text`
  margin-left: 4px;
  font-family: fontExtraLight;
  font-size: 18px;
`;

export const receivedPostcardViewStyled = styled.View`
  margin-bottom: 10px;
  background: #d9d9d9;
  border-radius: 15px;
  margin-right: ${({ index }: any) => (index % 2 === 0 ? '5px' : 0)};
  margin-left: ${({ index }: any) => (index % 2 !== 0 ? '5px' : 0)};
  height: 244px;
  color: white;
`;

export const sendPostcardViewStyled = styled.View`
  height: 140px;
  margin-bottom: 10px;
`;

export const ListWrapper = styled.View`
  margin-top: 10px;
  height: 100%;
`;

export const GoToTopImage = styled.Image`
  width: 14px;
  height: 14px;
  align-content: center;
  justify-content: center;
`;

export const styles: any = StyleSheet.create({
  GoToTopButton: {
    position: 'absolute',
    bottom: 12,
    right: 5,
    borderRadius: 20,
    padding: 12,
    backgroundColor: '#fff',
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
  PostcardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
