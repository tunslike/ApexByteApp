import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import { AuthProvider } from './src/context/AuthContext';
import Router from './src/views/navigation/Router';


const App = () => {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1}}>
      <SafeAreaProvider>
      <AuthProvider>
          <Router />
          <Toast />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </Provider>
  )
}

export default App;