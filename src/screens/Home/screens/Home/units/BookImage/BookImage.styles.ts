import styled from 'styled-components/native';

export const Wrapper = styled.View`
  height: 258px;
  position: relative;

  overflow: hidden;
`;

export const BookWrapper = styled.View`
  padding: 24px 100px;

  z-index: 3;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: 100%;

  object-fit: fill;
`;

export const TransparentBackground = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(255, 255, 255, 0.8);
  z-index: 2;
`;

export const BookBackground = styled.Image`
  position: absolute;

  width: 520px;
  height: 700px;

  z-index: 1;
`;
