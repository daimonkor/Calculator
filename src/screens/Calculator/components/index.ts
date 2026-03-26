import { TextStyle, ViewStyle } from 'react-native';

export * from './CalculatorButton.tsx';

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
  value?: string;
  onPress?: (
    callback: (operand: Operand, value?: string | number) => void,
  ) => () => void;
  id: string;
  textStyle?: TextStyle;
  operand: Operand;
};

export const mathOperation = [
  { operand: Operand.MINUS, value: '-', mathOperationSymbol: '-' },
  { operand: Operand.PLUS, value: '+', mathOperationSymbol: '+' },
  { operand: Operand.DIVIDE, value: '÷', mathOperationSymbol: '/' },
  { operand: Operand.MULTIPLE, value: '×', mathOperationSymbol: '*' },
];
export const operatorChars = mathOperation.map(op => op.value).join('');
const escapedOperatorChars = operatorChars.replace(/[-\\^]/g, '\\$&');
const operatorRegex = new RegExp(`[${escapedOperatorChars}]`);
export const trailingOperatorRegex = new RegExp(`[${escapedOperatorChars}]+$`);
export const canAddDot = (str: string) => {
  const parts = str.split(operatorRegex);
  const lastNumber = parts[parts.length - 1];
  if (lastNumber === '') return true;
  return !lastNumber.includes('.');
};
