// // import { StatusBar } from "expo-status-bar";
import React from 'react';
import {LogBox, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Redux
import {Provider} from 'react-redux';
import store from './Redux/store';

// Context API
import Auth from './Context/store/Auth';

// Navigatiors
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';
import {NativeBaseProvider} from 'native-base';

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            {/* <Header /> */}
            <Main />
            <Toast ref={ref => Toast.setRef(ref)} />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}
