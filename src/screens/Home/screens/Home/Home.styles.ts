import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 64px 12px 20px;

  align-items: center;
  justify-content: center;
`;

export const LoadingWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 90%;

  background-color: #d9d9d9;
  border-radius: 10px;
`;
