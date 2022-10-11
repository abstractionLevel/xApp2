/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AsyncStorage 
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import Account from "./src/screens/Account";
import ProfileWorker from "./src/screens/ProfileWorker";
import Login from "./src/screens/Login";
import HomeTabNavigation from "./src/navigation/HomeTabNavigation";


const Stack = createNativeStackNavigator();



const App = () => {

    const [userAuth,setUserAuth] = useState(false)

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
            setUserAuth(value)
            console.log(value);
            }
        } catch (error) {
            console.local(error)
        }
    };
    useEffect(()=>{
        retrieveData()
    },[])

    
	
	return (
        <>
        {userAuth ?
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
            : <Login/>
        }
        </>
		
	)
};
export default App;
