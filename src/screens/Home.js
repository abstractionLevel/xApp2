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
    TouchableOpacity
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';



const Home = () => {


    const onPressAndress = () => {
        console.log("address");
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.buttonAndress}
                onPress={() => onPressAndress()}
            >
                <Text style={styles.textAndress} >Gorizia</Text>
            </TouchableOpacity>
        </View>
    )

};


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
   


});
export default Home;