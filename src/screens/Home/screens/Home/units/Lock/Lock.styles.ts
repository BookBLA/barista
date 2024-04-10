import styled from 'styled-components/native';

export const LockWrapper = styled.View`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(247, 244, 237, 0.8);
  z-index: 10;
  border-radius: 15px 15px 0px 0px;
`;

export const LockImage = styled.Image`
  width: 60px;
  height: 74px;
  margin-bottom: 16px;
`;
