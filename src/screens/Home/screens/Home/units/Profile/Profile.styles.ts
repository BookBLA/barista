import styled from 'styled-components/native';

export const ProfileWrapper = styled.TouchableOpacity`
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

export const BookImage = styled.Image`
  width: 100%;
  height: 175px;
  object-fit: fill;
`;
