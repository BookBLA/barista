import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const ContainerViewStyled = styled.View`
  width: 100%;
  height: 100%;
  color: white;
`;

export const BookImageWrapper = styled.View`
  width: 101%;
  height: 100%;
  background-color: rgba(236, 237, 239, 0.5);
  resize-mode: cover;
  border-radius: 12px;
  position: absolute;
`;

export const BookImage = styled.Image`
  width: 104.8%;
  height: 80%;
  resize-mode: cover;
  border-radius: 20px 20px 0 0;
  position: relative;
  top: 0;
  left: -3px;
`;

export const PostcardInfoViewStyled = styled.View`
  width: auto;
  background: white;
  height: 20%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 4px 8px;
`;

export const PostcardTextViewStyled = styled.Text`
  color: ${colors.textGray5};
  font-size: 14px;
  font-family: fontMedium;
`;

export const PostcardInfoFirstViewStyled = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

//todo 자기가 열람했을때 색 변할 수 도있음. 투명도

export const EmptyPostcardModalWrapper = styled.View`
  padding: 20px;
`;

export const ModalBottomWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px 0;
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
