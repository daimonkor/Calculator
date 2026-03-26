import { FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { colors } from '../../theme/colors.ts';

export const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        alignItems: 'flex-start',
        paddingLeft: 10,
      }}
    >
      <Icon
        name="menu"
        size={30}
        onPress={navigation?.toggleDrawer}
        type={'ionicon'}
        color={colors.white}
      />
    </View>
  );
};
