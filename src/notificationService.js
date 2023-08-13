import {
    AsyncStorage
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Url from './utils/Urls';
import axios from './http/axios';

export async function requestUserPermission() {

    const authStatus = await messaging().requestPermission();
    const enabled =  authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken();
    }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken222");
    if(!fcmToken) {
        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken) {
                await AsyncStorage.setItem("fcmToken", fcmToken);
                const principalStored = await AsyncStorage.getItem("principal");
                const principal = JSON.parse(principalStored);
                const token = await AsyncStorage.getItem('logged');
                axios.put(Url.fetchUser+"/fcmToken/"+principal.userId , {fcmToken: fcmToken},{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }) 
                    .then(response=>{
                        if(response) {
                            console.log(response);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                
            }
        }catch(error) {
            console.log("ce un arrore con il token");
        }
    }
}

export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log( 'Notification caused app to open from background state:',remoteMessage.notification, );
    });

    messaging()
    .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification, );
            }
    });

    messaging().onMessage(async remoteMessage=>{
        console.log("notification on... ", remoteMessage);
    })
}