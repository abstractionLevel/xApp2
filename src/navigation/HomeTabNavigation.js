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
import axios from '../http/axios';
import Url from '../utils/Urls'
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { connectedToChat } from '../redux/store';

const HomeTabNavigation = ({ route }) => {

	const logout = route.params?.logout;
	const Tab = createBottomTabNavigator();
	const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();

	const { auth } = useContext(AppContext);
	const [authUser, setAuthUser] = useState(null);
	const [socketChat,setSocketChat] = useState(null);
	const [principal,setPrincipal] = useState(null);

	const savePrincipal = async (user) => {
        try {
            await AsyncStorage.setItem('principal', JSON.stringify(user));
        } catch (error) {
            console.log('Errore nel savlare il principal ', error);
        }
    }

	const getUserInfo = async () => {
		console.log("prelevamento dati utente")
        const token = await AsyncStorage.getItem('logged');
        axios.get(Url.fetchUser + "/" + token, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data) {
                    savePrincipal(response.data);
					setPrincipal(response.data);
                    // connesione a chat
                    const socket = io('http://192.168.1.9:3000', {
                        auth: {
                            username: response.data.userId,
                        }
                    });
					setSocketChat(socket);
                    dispatch(connectedToChat(socket));
                }
            }).catch((e) => {
                console.log(e)
            })
    }

	useEffect(() => {
        //ricevo messaggio da chat-be
		if(socketChat!=null) {
			socketChat.on('message', (response) => {
				
				console.log("messaggio arrivato ", response, " a" , principal.fullName)
				// console.log("messaggio in entrata ", response);
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
		}
      

    }, [socketChat]);


	useEffect(() => {
		getToken();
	}, []);

	useEffect(() => {
		getToken();
	}, [auth]);

	useEffect(() => {
		getToken();
	}, [logout]);

	useEffect(() => {
        getUserInfo();
    }, [])


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
