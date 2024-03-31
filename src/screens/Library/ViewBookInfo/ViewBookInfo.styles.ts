import styled from 'styled-components/native';
import { deviceHeight } from '../../../commons/utils/dimensions';

export const BookInfoContainer = styled.View`
  flex-direction: row;
`;
export const BookWrapper = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: ${deviceHeight / 5 - 50}px;
  border-radius: 10px;
  object-fit: fill;
`;

export const BookTitleWrapper = styled.View`
  flex: 2;
  justify-content: flex-end;
  padding-left: 8px;
`;

export const DashLine = styled.View`
  width: 100%;
  margin: 20px 0;
  border: 1px dashed #d2d6e2;
`;

export const BookReviewContainer = styled.View``;

export const BookReviewHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
export const BookReviewWrapper = styled.View`
  width: 100%;
  height: 120px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff5d6;
`;
