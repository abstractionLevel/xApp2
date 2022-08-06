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
        </View>
    )

};

var { width, height } = Dimensions.get('window');

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
    },
    buttonAndress: {
        flexDirection: 'row',
        width: '80%',
    },
    textAndress: {
        fontFamily: 'RobotoBoldItalic',
        color: 'orange',
        fontSize: '18@s',
        textTransform: 'capitalize',
        justifyContent: 'center',
        flexShrink: 1,
    },
    imagePlumbers: {
        resizeMode: "contain",
        width: width,
        height: '180@s',
        opacity: 0.4,
    },


});
export default Home;