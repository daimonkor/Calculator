export * from './CalculatorButton.tsx';
export * from './types';
import { Operand } from './types';

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
