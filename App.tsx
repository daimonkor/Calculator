import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigator } from './src/navigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <Navigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
