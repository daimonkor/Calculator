import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header, Text } from '../../components';
import {
  CalculatorButton,
  canAddDot,
  Key,
  mathOperation,
  Operand,
  operatorChars,
  trailingOperatorRegex,
} from './components';
import { evaluateExpression, fixPrecision, wrapCustomFont } from '../../utils';
import { colors } from '../../theme/colors.ts';

const digit = (n: number): Key => ({
  label: String(n),
  id: String(n),
  value: n,
  operand: Operand.DIGITAL,
});

const orangeStyle: Partial<Key> = {
  containerStyle: { backgroundColor: colors.calculatorOrange },
  gradientColorCenter: colors.calculatorOrangeGradientCenter,
  gradientColorEdge: colors.calculatorOrangeGradientEdge,
};

const operator = (label: string, operand: Operand, fontSize: number): Key => ({
  label,
  id: label,
  value: label,
  operand,
  textStyle: { color: colors.white, fontSize },
  ...orangeStyle,
});

const data: Array<Array<Key>> = [
  [
    {
      label: 'AC',
      id: 'AC',
      operand: Operand.CLEAN,
      textStyle: { fontSize: 35 },
    },
    {
      label: '+/-',
      id: '+/-',
      operand: Operand.PLUS_AND_MINUS,
      textStyle: { fontSize: 35 },
    },
    {
      label: '%',
      id: '%',
      value: '%',
      operand: Operand.PERCENT,
      textStyle: { fontSize: 35 },
    },
    operator('÷', Operand.DIVIDE, 60),
  ],
  [digit(7), digit(8), digit(9), operator('×', Operand.MULTIPLE, 55)],
  [digit(4), digit(5), digit(6), operator('-', Operand.MINUS, 75)],
  [digit(1), digit(2), digit(3), operator('+', Operand.PLUS, 65)],
  [
    {
      ...digit(0),
      containerStyle: {
        width: '50%',
        flex: 0,
        alignItems: 'flex-start',
        paddingLeft: '10%',
      },
    },
    {
      label: '.',
      id: '.',
      value: '.',
      operand: Operand.DOT,
      containerStyle: { flex: 1 },
      textStyle: { fontSize: 65 },
    },
    {
      label: '=',
      id: '=',
      operand: Operand.EQUAL,
      textStyle: { color: colors.white, fontSize: 65 },
      ...orangeStyle,
      containerStyle: {
        backgroundColor: colors.calculatorOrange,
        width: '25%',
        flex: 0,
      },
    },
  ],
];

export const Calculator = () => {
  const [displayText, setDisplayText] = useState<string>('');
  const [lastToken, setLastToken] = useState<{
    operand: Operand;
    value: string | null | undefined | number;
  }>({ operand: Operand.NONE, value: '' });
  const isNaN = (v: string) => v.toLowerCase() === 'nan';
  const handlePress = useCallback(
    (operand: Operand, value?: string | number) => () => {
      switch (operand) {
        case Operand.DIGITAL:
          setDisplayText(oldValue => {
            return `${
              oldValue === '0' || isNaN(oldValue) ? '' : oldValue
            }${value}`;
          });
          break;
        case Operand.MULTIPLE:
        case Operand.DIVIDE:
        case Operand.MINUS:
        case Operand.PLUS:
          setDisplayText(oldValue => {
            if (isNaN(oldValue)) return '0';
            if (
              [
                Operand.MULTIPLE,
                Operand.DIVIDE,
                Operand.MINUS,
                Operand.PLUS,
              ].includes(lastToken.operand)
            )
              return oldValue?.replace(lastToken.value, value);
            return oldValue === '0' ? '' : `${oldValue}${value}`;
          });
          break;
        case Operand.PERCENT:
          setDisplayText(oldValue => {
            if (isNaN(oldValue)) return '0';
            const lastNumberMatch = oldValue.match(
              /(\d+(\.\d+)?([eE][+-]?\d+)?)$/,
            );
            if (!lastNumberMatch) {
              return oldValue;
            }
            const fullMatch = lastNumberMatch[0];
            const numberValue = parseFloat(fullMatch);
            const percentValue = fixPrecision(numberValue / 100);
            return oldValue.slice(0, lastNumberMatch.index) + percentValue;
          });
          break;
        case Operand.EQUAL:
          setDisplayText(oldValue => {
            if (isNaN(oldValue)) return '0';
            let result = oldValue;
            const tailRegex = /[+\-*/%.\s]+$/;
            result = result.replace(tailRegex, '');
            result = result.replace(trailingOperatorRegex, '');
            mathOperation.forEach(op => {
              const escaped = op.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const regex = new RegExp(escaped, 'g');
              result = result.replace(regex, op.mathOperationSymbol);
            });
            return evaluateExpression(result);
          });
          break;
        case Operand.DOT:
          setDisplayText(oldValue => {
            if (isNaN(oldValue)) return '0';
            return canAddDot(oldValue) ? `${oldValue}${value}` : oldValue;
          });
          break;
        case Operand.PLUS_AND_MINUS:
          setDisplayText(oldValue => {
            if (isNaN(oldValue) || oldValue === '0') return '0';
            const match = oldValue.match(/(\d+(\.\d+)?([eE][+-]?\d+)?)$/);
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
              if (!beforeLastChar || /[+*/(]/.test(beforeLastChar)) {
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
          setDisplayText('0');
          break;
      }
      setLastToken({ operand, value });
    },
    [lastToken.operand, lastToken.value],
  );
  const onBackSpace = useCallback(() => {
    setDisplayText(oldValue => {
      if (isNaN(oldValue)) return '0';
      const newValue = oldValue.slice(0, -1);
      if (operatorChars.includes(newValue)) {
        return '0';
      }
      return newValue || '0';
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.resultContainer}>
        <Text
          testID="textExpression"
          adjustsFontSizeToFit={true}
          style={styles.resultText}
          numberOfLines={3}
        >
          {!(displayText?.length > 0) ? '0' : displayText}
        </Text>
        <Icon
          testID="backspace"
          name={'backspace'}
          color={colors.white}
          size={30}
          onPress={onBackSpace}
        />
      </View>
      <View style={styles.buttonHolder}>
        {data?.map((item, index) => (
          <View key={index} style={styles.buttonRowHolder}>
            {item?.map(item2 => (
              <CalculatorButton
                key={item2.id}
                label={item2.label}
                textStyle={item2?.textStyle}
                containerStyle={item2.containerStyle}
                gradientColorCenter={item2.gradientColorCenter}
                gradientColorEdge={item2.gradientColorEdge}
                onPress={handlePress(item2.operand, item2.value)}
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
    padding: 15,
  },
  resultText: wrapCustomFont({
    fontSize: 100,
    fontWeight: '100',
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
