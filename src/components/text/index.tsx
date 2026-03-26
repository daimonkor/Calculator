import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, Text as StandardText } from 'react-native';
import { colors } from '../../theme/colors.ts';
import { wrapCustomFont } from '../../utils';

export const Text = forwardRef<
  React.ComponentRef<typeof StandardText>,
  React.ComponentProps<typeof StandardText>
>((props, ref) => {
  const styleMod = useMemo(
    () => wrapCustomFont(StyleSheet.flatten([styles.text, props.style])),
    [props.style],
  );
  return <StandardText {...props} style={styleMod} ref={ref} />;
});

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arimo',
    fontWeight: '400',
    color: colors.black,
    textAlign: 'left',
    fontVariant: ['tabular-nums'],
  },
});
