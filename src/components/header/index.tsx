import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../../theme/colors.ts';

export const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const containerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, { marginTop: insets.top }]),
    [insets.top],
  );
  const onPress = useCallback(
    () => navigation.dispatch(DrawerActions.toggleDrawer()),
    [navigation],
  );
  return (
    <View style={containerStyle}>
      <Icon
        testID="menu-button"
        name="menu"
        size={30}
        onPress={onPress}
        type={'ionicon'}
        color={colors.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
});
