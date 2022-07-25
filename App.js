/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import HomeTabNavigation from "./src/navigation/HomeTabNavigation";


const Stack = createNativeStackNavigator();


const App = () => {
	
	return (
		<NavigationContainer>
     		<Stack.Navigator>
        		
				 <Stack.Screen
                    name={"Home"}
                    component={HomeTabNavigation}
                    options={{ headerShown: false }}

                />
      		</Stack.Navigator>
    	</NavigationContainer>
	)
};
export default App;
