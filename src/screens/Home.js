import React, {useState,useEffect} from 'react';
import { 
    NativeRouter, 
    Route,
    Link 
} from "react-router-native";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AddressComponent from '../components/AddressComponent';
import SearchWorker from '../components/SearchWorker';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Home = () => {

    const [userAuth,setUserAuth] = useState(false)

    const navigation = useNavigation()

    

    const retrieveToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                setUserAuth(value)
            }
            else {
                navigation.navigate("Login")
            }
        } catch (error) {
            console.local(error)
        }
    };
    useEffect(()=>{
        retrieveToken()
    },[])
 

    return (
        <>
        {userAuth &&
            <View>
                <AddressComponent/>
                <Image
                    style={styles.imagePlumbers}
                    source={require('../../assets/plumbers.jpg')}
                />
                <SearchWorker/>
                <Image
                    style={styles.imageConnectionWorkers}
                    source={require('../../assets/connectionWorker2.png')}
                />
            </View>
            
        }
        </>
    )

};

var { width, height } = Dimensions.get('window');

const styles = ScaledSheet.create({
    imagePlumbers: {
        resizeMode: "contain",
        width: width,
        height: '180@s',
        opacity: 0.5,
    },
    imageConnectionWorkers: {
        resizeMode: "contain",
        width: width,
        marginTop: 20,
        justifyContent: 'center',
        opacity: 0.4,
    },


});
export default Home;