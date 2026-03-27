import { FC, useCallback, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { Text } from '../../../components';
import { wrapCustomFont } from '../../../utils';
import { colors } from '../../../theme/colors.ts';

interface ICalculatorButtonProps {
  label: string;
  textStyle?: TextStyle;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  gradientColorCenter?: string;
  gradientColorEdge?: string;
}

export const CalculatorButton: FC<ICalculatorButtonProps> = ({
  label,
  textStyle,
  onPress,
  containerStyle,
  gradientColorCenter = '#C4C5C6',
  gradientColorEdge = '#C2C3C5',
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }, []);
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
      activeOpacity={0.7}
      onPress={onPress}
      onLayout={onLayout}
      style={containerStyleMod}
    >
      {size.width > 0 && size.height > 0 && (
        <Svg
          height={size.height - 1}
          width={size.width - 1}
          style={StyleSheet.absoluteFill}
        >
          <Defs>
            <RadialGradient
              id="grad"
              cx={size.width / 2}
              cy={size.height * 0.4}
              rx={size.width * 0.7}
              ry={size.height * 0.7}
              fx={size.width / 2}
              fy={size.height * 0.4}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={gradientColorCenter}
                stopOpacity="1"
              />
              <Stop offset="1" stopColor={gradientColorEdge} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={size.width - 1}
            height={size.height - 1}
            fill="url(#grad)"
          />
        </Svg>
      )}
      <Text style={textStyleMod}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.calculatorBorder,
    flex: 1,
  },
  buttonText: { fontSize: 42, fontWeight: '100' },
});
