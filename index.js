/**
 * @format
 */
import React from 'react';
import {AppRegistry,LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AppProvider} from './context'


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Root = () => (
    <AppProvider>
      <App />
      </AppProvider>
  )

AppRegistry.registerComponent(appName, () =>  Root);
