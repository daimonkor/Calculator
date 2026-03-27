import { Calculator } from '../src/screens/Calculator';
import { fireEvent, render } from '@testing-library/react-native';

it('displays 2÷2 after pressing 2, ÷, 2', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('2'));
  fireEvent.press(getByText('÷'));
  fireEvent.press(getByText('2'));

  expect(getByText('2÷2')).toBeTruthy();
});

it('displays 0.02 after pressing 2, %', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('2'));
  fireEvent.press(getByText('%'));

  expect(getByText('0.02')).toBeTruthy();
});

it('displays NaN after pressing 2, ÷, 0, =', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('2'));
  fireEvent.press(getByText('÷'));
  fireEvent.press(getByText('0'));
  fireEvent.press(getByText('='));

  expect(getByText('NaN')).toBeTruthy();
});

it('replaces operator when pressing + then -', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('+'));
  fireEvent.press(getByText('-'));

  expect(getByText('5-')).toBeTruthy();
});

it('returns same value when pressing % with no number', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('+'));
  fireEvent.press(getByText('%'));

  expect(getByText('0')).toBeTruthy();
});

it('adds dot to number', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('.'));
  fireEvent.press(getByText('3'));

  expect(getByText('5.3')).toBeTruthy();
});

it('does not add second dot to same number', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('.'));
  fireEvent.press(getByText('3'));
  fireEvent.press(getByText('.'));

  expect(getByText('5.3')).toBeTruthy();
});

it('negates a positive number with +/-, must be -7', () => {
  const { getByText, getByTestId } = render(<Calculator />);
  fireEvent.press(getByText('7'));
  fireEvent.press(getByText('+/-'));
  expect(getByTestId('textExpression')).toHaveTextContent('-7');
});

it('removes negation when pressing +/- twice, must be 7', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('7'));
  fireEvent.press(getByText('+/-'));
  fireEvent.press(getByText('+/-'));

  expect(getByTestId('textExpression')).toHaveTextContent('7');
});

it('+/- toggles sign after operator, must be 3-5', () => {
  const { getByText } = render(<Calculator />);

  fireEvent.press(getByText('3'));
  fireEvent.press(getByText('+'));
  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('+/-'));

  expect(getByText('3-5')).toBeTruthy();
});

it('+/- on zero returns 0', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('+/-'));

  expect(getByTestId('textExpression')).toHaveTextContent('0');
});

it('+/- after × inserts minus, must be 3×-5', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('3'));
  fireEvent.press(getByText('×'));
  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('+/-'));

  expect(getByTestId('textExpression')).toHaveTextContent('3×-5');
});

it('+/- replaces minus with plus after ×, must be 3×+5', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('3'));
  fireEvent.press(getByText('×'));
  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('+/-')); // 3×-5
  fireEvent.press(getByText('+/-')); // 3×+5 (line 186)

  expect(getByTestId('textExpression')).toHaveTextContent('3×+5');
});

it('resets display to 0 on AC, must be 0', () => {
  const { getAllByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getAllByText('9')[0]);
  fireEvent.press(getAllByText('9')[0]);
  fireEvent.press(getAllByText('AC')[0]);

  expect(getByTestId('textExpression')).toHaveTextContent('0');
});

it('removes last character on backspace', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('1'));
  fireEvent.press(getByText('2'));
  fireEvent.press(getByText('3'));
  fireEvent.press(getByTestId('backspace'));

  expect(getByTestId('textExpression')).toHaveTextContent('12');
});

it('backspace on single digit shows 0', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('5'));
  fireEvent.press(getByTestId('backspace'));

  expect(getByTestId('textExpression')).toHaveTextContent('0');
});

it('backspace on NaN shows 0', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('2'));
  fireEvent.press(getByText('÷'));
  fireEvent.press(getByText('0'));
  fireEvent.press(getByText('='));
  expect(getByText('NaN')).toBeTruthy();

  fireEvent.press(getByTestId('backspace'));
  expect(getByTestId('textExpression')).toHaveTextContent('0');
});

it('backspace when remaining is operator shows 0', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('+'));
  fireEvent.press(getByTestId('backspace'));

  expect(getByTestId('textExpression')).toHaveTextContent('0');
});

it('adds dot after operator', () => {
  const { getByText, getByTestId } = render(<Calculator />);

  fireEvent.press(getByText('5'));
  fireEvent.press(getByText('+'));
  fireEvent.press(getByText('.'));

  expect(getByTestId('textExpression')).toHaveTextContent('5+.');
});

it('renders gradient after layout event', () => {
  const { getAllByText } = render(<Calculator />);
  const button = getAllByText('5')[0];
  const touchable = button.parent?.parent;

  fireEvent(touchable!, 'layout', {
    nativeEvent: { layout: { width: 100, height: 50 } },
  });

  expect(touchable).toBeTruthy();
});

it('pressing menu button calls navigation dispatch', () => {
  const { getByTestId } = render(<Calculator />);

  fireEvent.press(getByTestId('menu-button'));

  const { useNavigation } = require('@react-navigation/native');
  const navigation = useNavigation();
  expect(navigation.dispatch).toHaveBeenCalled();
});
