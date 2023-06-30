import React, { useState } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AddressComponent from '../components/AddressComponent';
import SearchWorker from '../components/SearchWorker';
import { Dimensions } from 'react-native';

const Home = () => {

    const [hideAddress, setHideAddress] = useState(false);
    const [searched,setSearched] = useState(null)

    return (
        <View
            style={styles.container}>
            {hideAddress === false &&
                <AddressComponent />
            }
            <Image
                style={styles.imagePlumbers}
                source={require('../../assets/plumbers.jpg')}
            />
            <View style={{ alignItems: 'center', }}>
                <TextInput
                    placeholderTextColor="gray"
                    underlineColorAndroid="white"
                    style={styles.inputSearch}
                    placeholder='Cosa Cerchi?'
                    onFocus={() => setHideAddress(true)}
                    onBlur={() => setHideAddress(false)}

                onChangeText={(val) => setSearched(val)}
                value={searched}
                />
                <TouchableOpacity
                    style={styles.buttonSearch}
                onPress={() => navigation.navigate('WorkerList', { searched: searched })}
                >
                    <Text style={styles.buttonText} >Cerca</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.imageConnectionWorkers}
                source={require('../../assets/connectionWorker2.png')}
            />
        </View>
    )
};

var { width, height } = Dimensions.get('window');

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
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
    inputSearch: {
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        fontSize: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderColor: '#0088ff',
        borderWidth: 1,
        paddingLeft: 10,

    },
    buttonSearch: {
        marginTop: 4,
        height: '50@s',
        width: '90%',
        backgroundColor: '#0096FF',
        borderRadius: 6,
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: '10@s',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        fontSize: 18,
        marginRight: 2,
        color: 'white',
    },


});
export default Home;