import { deviceHeight } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const BookInfoContainer = styled.View`
  align-items: center;
  margin-bottom: 22px;
`;
export const BookWrapper = styled.View`
  width: 90px;
  height: 132px;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: ${deviceHeight / 5 - 50}px;
  border-radius: 10px;
  object-fit: fill;
`;

export const BookTitleWrapper = styled.View`
  margin-top: 14px;
  justify-content: center;
  align-items: center;
`;

export const BookReviewContainer = styled.View``;

export const BookReviewWrapper = styled.View`
  width: 100%;
  height: 150px;
  padding: 20px;
  border-radius: 10px;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  background-color: white;
  margin-bottom: 12px;
`;
