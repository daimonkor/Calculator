const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => {
  const View = require('react-native').View;
  return {
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({
      dispatch: mockDispatch,
    }),
    DrawerActions: {
      toggleDrawer: jest.fn(),
    },
  };
});

jest.mock('react-native-safe-area-context', () => {
  const View = require('react-native').View;
  return {
    SafeAreaProvider: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: require('react-native').ScrollView,
    PanGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    NativeViewGestureHandler: View,
    RotationGestureHandler: View,
    PinchGestureHandler: View,
    Directions: {},
    gestureHandlerRootHOC: jest.fn(component => component),
  };
});
