import React from 'react';
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
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AddressComponent from '../components/AddressComponent';
import SearchWorker from '../components/SearchWorker';
import { Dimensions } from 'react-native';

const Home = () => {


    const onPressAndress = () => {
        console.log("address");
    }

    return (
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