import { useCallback, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Header, Text } from '../../components';
import { wrapCustomFont } from '../../utils';
import { colors } from '../../theme/colors.ts';
import { CalculatorButton } from './components';

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

type Key = {
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

const mathOperation = [
  { operand: Operand.MINUS, value: '-', mathOperationSymbol: '-' },
  { operand: Operand.PLUS, value: '+', mathOperationSymbol: '+' },
  { operand: Operand.DIVIDE, value: '÷', mathOperationSymbol: '/' },
  { operand: Operand.MULTIPLE, value: '×', mathOperationSymbol: '*' },
];
const operatorChars = mathOperation.map(op => op.value).join('');
const escapedOperatorChars = operatorChars.replace(/[-\\^]/g, '\\$&');
const operatorRegex = new RegExp(`[${escapedOperatorChars}]`);
const trailingOperatorRegex = new RegExp(`[${escapedOperatorChars}]+$`);
const canAddDot = (str: string) => {
  const parts = str.split(operatorRegex);
  const lastNumber = parts[parts.length - 1];
  if (lastNumber === '') return true;
  return !lastNumber.includes('.');
};

const data: Array<Array<Key>> = [
  [
    {
      label: 'AC',
      onPress: callback => () => {
        callback?.(Operand.CLEAN);
      },
      id: 'AC',
      textStyle: { fontSize: 35 },
      operand: Operand.CLEAN,
    },
    {
      label: '±',
      onPress: callback => () => {
        callback?.(Operand.PLUS_AND_MINUS);
      },
      id: '+/-',
      textStyle: { fontSize: 50 },
      operand: Operand.PLUS_AND_MINUS,
    },
    {
      label: '%',
      onPress: callback => () => {
        callback?.(Operand.PERCENT, '%');
      },
      id: '%',
      textStyle: { fontSize: 35 },
      operand: Operand.PERCENT,
    },
    {
      label: '÷',
      onPress: callback => () => {
        callback?.(Operand.DIVIDE, '÷');
      },
      id: '÷',
      textStyle: { color: colors.white, fontSize: 60 },
      containerStyle: { backgroundColor: colors.calculatorOrange },
      operand: Operand.DIVIDE,
    },
  ],
  [
    {
      label: '7',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 7);
      },
      id: '7',
      operand: Operand.DIGITAL,
    },
    {
      label: '8',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 8);
      },
      id: '8',
      operand: Operand.DIGITAL,
    },
    {
      label: '9',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 9);
      },
      id: '9',
      operand: Operand.DIGITAL,
    },
    {
      label: '×',
      onPress: callback => () => {
        callback?.(Operand.MULTIPLE, '×');
      },
      id: '×',
      textStyle: { color: colors.white, fontSize: 55 },
      containerStyle: { backgroundColor: colors.calculatorOrange },
      operand: Operand.MULTIPLE,
    },
  ],
  [
    {
      label: '4',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 4);
      },
      id: '4',
      operand: Operand.DIGITAL,
    },
    {
      label: '5',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 5);
      },
      id: '5',
      operand: Operand.DIGITAL,
    },
    {
      label: '6',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 6);
      },
      id: '6',
      operand: Operand.DIGITAL,
    },
    {
      label: '-',
      onPress: callback => () => {
        callback?.(Operand.MINUS, '-');
      },
      id: '-',
      textStyle: { color: colors.white, fontSize: 75 },
      containerStyle: { backgroundColor: colors.calculatorOrange },
      operand: Operand.MINUS,
    },
  ],
  [
    {
      label: '1',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 1);
      },
      id: '1',
      operand: Operand.DIGITAL,
    },
    {
      label: '2',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 2);
      },
      id: '2',
      operand: Operand.DIGITAL,
    },
    {
      label: '3',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 3);
      },
      id: '3',
      operand: Operand.DIGITAL,
    },
    {
      label: '+',
      onPress: callback => () => {
        callback?.(Operand.PLUS, '+');
      },
      id: '+',
      textStyle: { color: colors.white, fontSize: 65 },
      containerStyle: { backgroundColor: colors.calculatorOrange },
      operand: Operand.PLUS,
    },
  ],
  [
    {
      label: '0',
      onPress: callback => () => {
        callback?.(Operand.DIGITAL, 0);
      },
      id: '0',
      operand: Operand.DIGITAL,
      containerStyle: {
        width: '50%',
        flex: 0,
        alignItems: 'flex-start',
        paddingLeft: '10%',
      },
    },
    {
      label: '.',
      onPress: callback => () => {
        callback?.(Operand.DOT, '.');
      },
      id: '.',
      containerStyle: { flex: 1 },
      textStyle: { fontSize: 65 },
      operand: Operand.DOT,
    },
    {
      label: '=',
      onPress: callback => () => {
        callback?.(Operand.EQUAL);
      },
      id: '=',
      textStyle: { color: colors.white, fontSize: 65 },
      containerStyle: {
        backgroundColor: colors.calculatorOrange,
        width: '25%',
        flex: 0,
      },
      operand: Operand.EQUAL,
    },
  ],
];

export const Calculator = () => {
  const [displayText, setDisplayText] = useState<string>('');
  const [lastToken, setLastToken] = useState<{
    operand: Operand;
    value: string | null | undefined | number;
  }>({ operand: Operand.NONE, value: '' });
  const fixPrecision = useCallback((calculation: number) => {
    if (!isFinite(calculation)) return 'NaN';
    let finalResult;
    if (
      Math.abs(calculation) > 1e15 ||
      (Math.abs(calculation) < 1e-7 && calculation !== 0)
    ) {
      finalResult = calculation.toPrecision(10).replace(/\.?0+e/, 'e');
    } else {
      finalResult = Number(Math.round(calculation * 1e12) / 1e12).toString();
    }
    return finalResult;
  }, []);
  const evaluateResult = useCallback(
    (result: string | null | undefined) => {
      let calculation;
      try {
        const raw = new Function(`return ${result}`)();
        calculation = Number(raw);
      } catch {
        return result;
      }
      return fixPrecision(calculation);
    },
    [fixPrecision],
  );
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.resultContainer}>
        <Text
          adjustsFontSizeToFit={true}
          style={styles.resultText}
          numberOfLines={3}
        >
          {!(displayText?.length > 0) ? '0' : displayText}
        </Text>
      </View>
      <View style={styles.buttonHolder}>
        {data?.map((item, index) => (
          <View key={index} style={styles.buttonRowHolder}>
            {item?.map(item2 => (
              <CalculatorButton
                label={item2.label}
                textStyle={item2?.textStyle}
                key={item2.id}
                containerStyle={item2.containerStyle}
                onPress={item2.onPress?.((operand, value) => {
                  switch (operand) {
                    case Operand.DIGITAL:
                      setDisplayText(oldValue => {
                        return `${oldValue === '0' ? '' : oldValue}${value}`;
                      });
                      break;
                    case Operand.MULTIPLE:
                    case Operand.DIVIDE:
                    case Operand.MINUS:
                    case Operand.PLUS:
                      setDisplayText(oldValue => {
                        if (
                          [
                            Operand.MULTIPLE,
                            Operand.DIVIDE,
                            Operand.MINUS,
                            Operand.PLUS,
                          ].includes(lastToken.operand)
                        )
                          return oldValue;
                        return `${oldValue === '0' ? '' : oldValue}${value}`;
                      });
                      break;
                    case Operand.PERCENT:
                      setDisplayText(oldValue => {
                        const lastNumberMatch = oldValue.match(/(\d+[.]?\d*)$/);
                        if (!lastNumberMatch) {
                          return oldValue;
                        }
                        const fullMatch = lastNumberMatch[0];
                        const numberValue = parseFloat(fullMatch);
                        const percentValue = fixPrecision(numberValue / 100);
                        return (
                          oldValue.slice(0, lastNumberMatch.index) +
                          percentValue
                        );
                      });
                      break;
                    case Operand.EQUAL:
                      setDisplayText(oldValue => {
                        let result = oldValue;
                        const tailRegex = /[+\-*/%.\s]+$/;
                        result = result.replace(tailRegex, '');
                        result = result.replace(trailingOperatorRegex, '');
                        mathOperation.forEach(op => {
                          const escaped = op.value.replace(
                            /[.*+?^${}()|[\]\\]/g,
                            '\\$&',
                          );
                          const regex = new RegExp(escaped, 'g');
                          result = result.replace(
                            regex,
                            op.mathOperationSymbol,
                          );
                        });
                        return evaluateResult(result);
                      });
                      break;
                    case Operand.DOT:
                      setDisplayText(oldValue => {
                        return canAddDot(oldValue)
                          ? `${oldValue}${value}`
                          : oldValue;
                      });
                      break;
                    case Operand.PLUS_AND_MINUS:
                      setDisplayText(oldValue => {
                        const match = oldValue.match(/([0-9.]+)$/);
                        if (!match) return oldValue;
                        const numberIndex = match.index;
                        const lastNumber = oldValue.slice(numberIndex);
                        let prefix = oldValue.slice(0, numberIndex);
                        if (prefix === '') {
                          return `-${lastNumber}`;
                        }
                        const lastChar = prefix[prefix.length - 1];
                        if (lastChar === '-') {
                          const beforeLastChar = prefix[prefix.length - 2];
                          if (
                            !beforeLastChar ||
                            /[+*/(]/.test(beforeLastChar)
                          ) {
                            return prefix.slice(0, -1) + lastNumber;
                          }
                          return prefix.slice(0, -1) + '+' + lastNumber;
                        }
                        if (lastChar === '+') {
                          return prefix.slice(0, -1) + '-' + lastNumber;
                        }
                        return `${prefix}-${lastNumber}`;
                      });
                      break;
                    case Operand.CLEAN:
                      setDisplayText(oldValue => {
                        const newValue = oldValue.slice(0, -1);
                        if (operatorChars.includes(newValue)) {
                          return '0';
                        }
                        return newValue || '0';
                      });
                      break;
                  }
                  setLastToken({ operand, value });
                })}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.calculatorBg },
  resultContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  resultText: wrapCustomFont({
    fontSize: 100,
    fontWeight: '100',
    fontFamily: 'System',
    color: colors.white,
  }),
  buttonHolder: {
    flex: 1,
    backgroundColor: colors.calculatorButtonBg,
    width: '100%',
  },
  buttonRowHolder: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: colors.calculatorBorder,
    flex: 1,
  },
  buttonText: { fontSize: 42, fontWeight: '200', fontFamily: 'System' },
});
