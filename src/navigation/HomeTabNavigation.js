import React, {useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import SavedWorker from '../screens/SavedWorker';
import Chat from '../screens/Chat';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather  from 'react-native-vector-icons/Feather';
import {useGlobalContext} from '../../context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeTabNavigation = () => {

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    const {auth} = useGlobalContext()

    return (
        <>
        {auth ?
        <Tab.Navigator
            >
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Fontisto name="search" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={'SavedWorker'}
                component={SavedWorker}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="heart" size={25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name={'Message'}
                component={Chat}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="message-square" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <EvilIcons name="user" size={25} color={color} />
                    ),
                }}

            />
        </Tab.Navigator>
        : <>
                    <Stack.Navigator>
                       
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
                        options={{ headerShown: false }}
                    />
                     </Stack.Navigator>
        </>
            }
        </>
    )


}

export default HomeTabNavigation;