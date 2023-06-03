import 'styled-components'
import theme from './theme'

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {};
}

export interface CustomStyleProps {
  bg?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  pt?: string;
  pr?: string;
  pl?: string;
  pb?: string;
  p?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  height?: string;
  width?: string;
  overflow?: string;
}