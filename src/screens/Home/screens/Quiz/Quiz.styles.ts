import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const ReadingQuizInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ReadingQuizTestContainer = styled.View`
  display: flex;
  background-color: white;
  padding: 24px 20px;
  border-radius: 10px;
`;

export const BookImage = styled.View`
  border-radius: 10px;
  border-width: 2px;
  border-color: ${colors.buttonNavStroke};
  overflow: hidden;
`;

export const BookTextContainer = styled.View`
  margin-top: 19px;
`;

export const BookTitleWrapper = styled.View`
  justify-content: space-between;
`;
