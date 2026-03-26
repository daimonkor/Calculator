export const fixPrecision = (calculation: number): string => {
  if (!isFinite(calculation)) return 'NaN';
  if (
    Math.abs(calculation) > 1e15 ||
    (Math.abs(calculation) < 1e-7 && calculation !== 0)
  ) {
    return calculation.toPrecision(10).replace(/\.?0+e/, 'e');
  }
  return Number(Math.round(calculation * 1e12) / 1e12).toString();
};

export const evaluateExpression = (expression: string): string => {
  let calculation;
  try {
    const sanitized = String(expression).replace(/[^0-9+\-*/.() ]/g, '');
    calculation = Number(
      Function('"use strict"; return (' + sanitized + ')')(),
    );
  } catch {
    return expression;
  }
  return fixPrecision(calculation);
};
