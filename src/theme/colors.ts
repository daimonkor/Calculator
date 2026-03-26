import { pSBC } from '../utils';
import { ColorValue } from 'react-native';

export const colors = {
  colorPrimary: '#000F9F',
  blue2: pSBC(0.85, '#000F9F') as ColorValue,
  background: '#ffffff',
  green: '#0E9B46',
  skeletonHighlightColor: '#c4e9e6',
  skeletonBackgroundColor: '#ddf2f1',
  darkGray: '#070707',
  gray: '#666666',
  gray2: '#D9D9D9',
  gray3: '#EEEEEE',
  gray4: '#B4B4B4',
  grayToast: '#F8F6F6',
  red2: '#BB1D1D',
  yellow: '#D89F0D',
  white: '#FFFFFF',
  black: '#000',
  black2: '#151515',
  lightBlue: ' #000F9F1A',
  calculatorBg: '#202020',
  calculatorButtonBg: '#D3D4D6',
  calculatorBorder: '#424343',
  calculatorOrange: '#F88C11',
  calculatorOrangeGradientCenter: '#F88E10',
  calculatorOrangeGradientEdge: '#F99111',
};
