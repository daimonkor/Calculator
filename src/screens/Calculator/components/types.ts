import { TextStyle, ViewStyle } from 'react-native';

export enum Operand {
  DIGITAL,
  PLUS,
  MINUS,
  DIVIDE,
  MULTIPLE,
  PERCENT,
  CLEAN,
  EQUAL,
  DOT,
  NONE,
  PLUS_AND_MINUS,
}

export type Key = {
  label: string;
  containerStyle?: ViewStyle;
  value?: string | number;
  id: string;
  textStyle?: TextStyle;
  operand: Operand;
  gradientColorCenter?: string;
  gradientColorEdge?: string;
};
