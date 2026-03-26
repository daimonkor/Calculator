import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Issues } from '../screens/Issues';
import { Calculator } from '../screens/Calculator';
import { Header } from '../components';
import { wrapCustomFont } from '../utils';

export const CustomDrawer = createDrawerNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <CustomDrawer.Navigator
        initialRouteName={'Calculator'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <CustomDrawer.Screen name="Issues" component={Issues} />
        <CustomDrawer.Screen name="Calculator" component={Calculator} />
      </CustomDrawer.Navigator>
    </NavigationContainer>
  );
};
