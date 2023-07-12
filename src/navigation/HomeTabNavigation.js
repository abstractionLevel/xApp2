import React, { useState, useEffect, useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import SavedWorker from '../screens/SavedWorker'
import Chat from '../screens/Chat'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
	AsyncStorage,
	TouchableOpacity,
	Text,
} from 'react-native';
import AppContext from '../context/appContext';
import { useSelector } from 'react-redux';


const HomeTabNavigation = ({ route }) => {

	const logout = route.params?.logout;
	const Tab = createBottomTabNavigator();
	const Stack = createNativeStackNavigator();

	const { auth } = useContext(AppContext);
	const [authUser, setAuthUser] = useState(null);
	const {socket} = useSelector((state)=>state);

	useEffect(() => {
        //ricevo messaggio da chat-be
        socket.on('message', (response) => {
            console.log("messaggio in entrata ", response);
            // if (response) {
            //     if(isChatRoomExists) {
            //         saveReceivedMessage(response,chatRoomId)
            //     }else {
            //         //passo il response in mododo da salvare il messaggio dopo
            //         //aver creato la chat
            //         createChatRoom(response);
            //     }
            // }
        });

    }, [socket]);


	useEffect(() => {
		getToken();
	}, []);

	useEffect(() => {
		getToken();
	}, [auth]);

	useEffect(() => {
		getToken();
	}, [logout]);

	const getToken = async () => {
		try {
			const logged = await AsyncStorage.getItem('logged');
			setAuthUser(logged);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{authUser ? (
				<Tab.Navigator
					tabBarOptions={{
						activeTintColor: '#0088ff', // Colore icona attiva
						inactiveTintColor: 'gray', // Colore icona inattiva
					}}
				// screenOptions={{ headerShown: false }}
				>
					<Tab.Screen
						name={'Home'}
						component={Home}
						options={{
							headerShown: false,
							tabBarIcon: ({ color }) => (
								<Fontisto name='search' size={25} color={color} />
							),
							title: ""
						}}
					/>
					<Tab.Screen
						name={'SavedWorker'}
						component={SavedWorker}
						options={({ navigation }) => ({
							tabBarIcon: ({ color }) => (
								<FontAwesome5 name='heart' size={25} color={color} />
							),
							headerLeft: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() => navigation.goBack()}
								>
									<Feather name='arrow-left' size={25} color='black' />
								</TouchableOpacity>
							), 
							headerRight: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() =>  navigation.navigate('Home')}
								>
									<Text style={{
										marginRight: 20,
										fontWeight: '900',
										color: 'black',
										fontSize: 20

									}}>xApp</Text>
								</TouchableOpacity>

							),
							title: ""
						})}
					/>

					<Tab.Screen
						name={'Message'}
						component={Chat}
						options={({ navigation }) => ({
							tabBarIcon: ({ color }) => (
								<Feather name='message-square' size={25} color={color} />
							),
							headerLeft: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() => navigation.goBack()}
								>
									<Feather name='arrow-left' size={25} color='black' />
								</TouchableOpacity>
							),
							headerRight: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() =>  navigation.navigate('Home')}
								>
									<Text style={{
										marginRight: 20,
										fontWeight: '900',
										color: 'black',
										fontSize: 20

									}}>xApp</Text>
								</TouchableOpacity>

							),
							title: ""
						})}
					/>
					<Tab.Screen
						name={'Profile'}
						component={Profile}
						options={({ navigation }) => ({
							tabBarIcon: ({ color }) => (
								<Feather name='user' size={25} color={color} />
							),
							headerLeft: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() => navigation.goBack()}
								>
									<Feather name='arrow-left' size={25} color='black' />
								</TouchableOpacity>
							),
							headerRight: () => (
								<TouchableOpacity
									style={{ marginLeft: 16 }}
									onPress={() =>  navigation.navigate('Home')}
								>
									<Text style={{
										marginRight: 20,
										fontWeight: '900',
										color: 'black',
										fontSize: 20

									}}>xApp</Text>
								</TouchableOpacity>

							),
							title: ""
						})}
					/>
				</Tab.Navigator>
			) : (
				<>
					<Stack.Navigator>
						<Stack.Screen
							name={'Login'}
							component={Login}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</>
			)}
		</>
	)
}

export default HomeTabNavigation
