import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 20px;
`;

export const ReviewWrapper = styled.View`
  margin-top: 5px;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;

export const QuoteWrapper = styled.View`
  width: 16px;
  height: 16px;

  align-self: ${({ align }: { align: string }) => (align === 'start' ? 'flex-start' : 'flex-end')};
`;

export const QuoteImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
