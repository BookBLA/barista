import { deviceHeight } from '@commons/utils/ui/dimensions/dimensions';
import { css } from 'styled-components/native';

const BREAKPOINTS = {
  XS: 560,
  SM: 640,
  MD: 720,
  LG: 800,
  XL: 900,
  XXL: 1024,
};

export const mediaQuery = {
  xs: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.XS &&
    css`
      ${styles}
    `}
  `,
  sm: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.SM &&
    css`
      ${styles}
    `}
  `,
  md: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.MD &&
    css`
      ${styles}
    `}
  `,
  lg: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.LG &&
    css`
      ${styles}
    `}
  `,
  xl: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.XL &&
    css`
      ${styles}
    `}
  `,
  xxl: (styles: string) => css`
    ${deviceHeight <= BREAKPOINTS.XXL &&
    css`
      ${styles}
    `}
  `,
  custom: (maxHeight: number, styles: any) => css`
    ${deviceHeight <= maxHeight &&
    css`
      ${styles}
    `}
  `,
};
