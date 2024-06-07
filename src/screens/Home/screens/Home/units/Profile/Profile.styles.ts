import styled from 'styled-components/native';

export const ProfileWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 46%;
  height: 736px;
  padding: 5px 6px 0px 6px;
  background-color: #fff;
  margin: 0 4px;
  border-radius: 15px 15px 0px 0px;
`;

export const BookImageWrapper = styled.View`
  width: 100%;
  height: 175px;
  background-color: #e2e2e2;
  border-radius: 10px 10px 0px 0px;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 10px 10px 0px 0px;
`;
