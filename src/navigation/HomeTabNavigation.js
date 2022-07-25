import React, {useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
const Tab = createBottomTabNavigator();


const HomeTabNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: 'orange',
                keyboardHidesTabBar: true,
                style: {
                    position: 'absolute',
                    backgroundColor: 'white',
                },
        }}>
        <Tab.Screen
            name={'Home'}
            component={Home}
            options={{
                
            }}
        />   
        </Tab.Navigator>
    )


}

export default HomeTabNavigation;