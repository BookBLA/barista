import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px 16px 16px;
`;

export const LeftContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LeftWrapper = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  background-color: #d9d9d9;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50px;
`;

export const RightWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  height: 48px;

  margin-left: 10px;
`;

export const InfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const GenderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const GenderImage = styled.Image`
  width: 20px;
  height: 20px;

  object-fit: fill;
`;

export const IconButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReportIconImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
