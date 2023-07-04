/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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
import {
    TouchableOpacity,
    Text
} from 'react-native';
import Chat from './src/screens/Chat'

const Stack = createNativeStackNavigator();

const App = () => {

    const [auth, setAuth] = useState(null);

    return (
        <Provider store={store}>
            <AppContext.Provider value={{ auth, setAuth }} >
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator>
                        <Stack.Screen
                            name={'HomeScreen'}
                            component={HomeTabNavigation}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={'Account'}
                            component={Account}
                            options={({navigation}) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
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
                            options={({navigation}) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />
                        <Stack.Screen
                            name={'ProfileWorker'}
                            component={ProfileWorker}
                            options={({navigation}) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />
                        <Stack.Screen
                            name={'ChangePassword'}
                            component={ChangePassword}
                            options={({navigation})=>({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />
                        <Stack.Screen
                            name={'JobProfile'}
                            component={JobProfile}
                            options={({ navigation }) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />
                          <Stack.Screen
                            name={'Chat'}
                            component={Chat}
                            options={({ navigation }) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        style={{ marginLeft: 16 }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{
                                            marginRight: 20,
                                            fontWeight: '900',
                                            color: 'black',
                                            fontSize: 20

                                        }}>xApp</Text>
                                    </TouchableOpacity>

                                ),
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppContext.Provider>
        </Provider>
    )
}
export default App
