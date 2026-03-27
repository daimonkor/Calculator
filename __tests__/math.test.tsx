import { canAddDot } from '../src/screens/Calculator/components';
import { evaluateExpression } from '../src/utils';

describe('mathUtils', () => {
  it('simple math test: 2 -2 +2, returned 2', () => {
    const input = '2 -2 +2  ';
    const result = evaluateExpression(input);
    expect(result).toBe('2');
  });

  it('divide by 0, returned NaN', () => {
    const input = '2 / 0  ';
    const result = evaluateExpression(input);
    expect(result).toBe('NaN');
  });

  it('can add dot 2., returned false', () => {
    const input = '2.';
    const result = canAddDot(input);
    expect(result).toBe(false);
  });

  it('fixPrecision formats very large numbers in scientific notation, returned e', () => {
    const result = evaluateExpression('9999999999999999');
    expect(result).toContain('e');
  });

  it('evaluateExpression returns expression on syntax error, returned inout value', () => {
    const result = evaluateExpression('(()');
    expect(result).toBe('(()');
  });
});
