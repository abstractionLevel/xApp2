/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React  from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import Account from "./src/screens/Account";
import ProfileWorker from "./src/screens/ProfileWorker";
import Login from "./src/screens/Login";
import HomeTabNavigation from "./src/navigation/HomeTabNavigation";


const Stack = createNativeStackNavigator();



const App = () => {

	return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen
                    name={"Home"}
                    component={HomeTabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"Account"}
                    component={Account}
                    options={{
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name={"Profile Worker"}
                    component={ProfileWorker}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={"Login"}
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                </Stack.Navigator>
            </NavigationContainer>
        </>
		
	)
};
export default App;
