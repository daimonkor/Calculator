import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Issues } from '../screens/Issues';
import { Calculator } from '../screens/Calculator';
import { Header } from '../components';
import { wrapCustomFont } from '../utils';
import { colors } from '../theme/colors.ts';

export const CustomDrawer = createDrawerNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <CustomDrawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerContentStyle: { backgroundColor: colors.calculatorBg },
          drawerInactiveTintColor: colors.white,
          drawerActiveTintColor: colors.calculatorOrangeGradientCenter,
        }}
      >
        <CustomDrawer.Screen name="Issues" component={Issues} />
        <CustomDrawer.Screen name="Calculator" component={Calculator} />
      </CustomDrawer.Navigator>
    </NavigationContainer>
  );
};
