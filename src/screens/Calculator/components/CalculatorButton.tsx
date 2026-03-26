import { FC, useMemo } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Text } from '../../../components';
import { wrapCustomFont } from '../../../utils';
import { colors } from '../../../theme/colors.ts';

interface ICalculatorButtonProps {
  label: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  key: string;
  containerStyle?: ViewStyle;
  id: string;
}

export const CalculatorButton: FC<ICalculatorButtonProps> = ({
  label,
  textStyle,
  onPress,
  id,
  containerStyle,
}) => {
  const textStyleMod = useMemo(
    () => wrapCustomFont([styles.buttonText, textStyle]),
    [textStyle],
  );
  const containerStyleMod = useMemo(
    () => StyleSheet.flatten([styles.button, containerStyle]),
    [containerStyle],
  );
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      key={id}
      style={containerStyleMod}
    >
      <Text style={textStyleMod}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
