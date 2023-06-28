/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// import Home from "./src/screens/Home";
import Account from './src/screens/Account'
import ProfileWorker from './src/screens/ProfileWorker'
import WorkerList from './src/screens/WorkerList'
import HomeTabNavigation from './src/navigation/HomeTabNavigation'
import SignUp from './src/screens/SignUp'
import AppContext from './src/context/appContext'
import { navigationRef } from './src/utils/navigationRef'
import ChangePassword from './src/screens/ChangePassword'
import JobProfile from './src/screens/JobProfile'
import { Provider } from 'react-redux';
import store from './src/redux/store'
const Stack = createNativeStackNavigator();

const App = () => {

    const [auth,setAuth] = useState(null);

    return (
        <Provider store={store}>
        <AppContext.Provider value={{auth,setAuth}} >
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'Home'}
                        component={HomeTabNavigation}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={'Account'}
                        component={Account}
                        options={{
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name={'SignUp'}
                        component={SignUp}
                        options={{
                            headerShown: false,
                        }}
                    />
					<Stack.Screen
                        name={'WorkerList'}
                        component={WorkerList}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name={'ProfileWorker'}
                        component={ProfileWorker}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name={'ChangePassword'}
                        component={ChangePassword}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name={'JobProfile'}
                        component={JobProfile}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
        </Provider>
    )
}
export default App
