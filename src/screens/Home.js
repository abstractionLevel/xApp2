import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import AddressComponent from '../components/AddressComponent';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import Url from '../utils/Urls';
import axios from '../http/axios';

const Home = () => {

    const [hideAddress, setHideAddress] = useState(false);
    const [searched, setSearched] = useState(null)
    const navigation = useNavigation();
    const [principal, setPrincipal] = useState({
        email: null,
        fullName: null,
    })
    const [socket, setSocket] = useState(null);

    const getUserInfo = async () => {
        const token = await AsyncStorage.getItem('logged');
        axios.get(Url.fetchUser + "/" + token, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (response.data) {
                    setPrincipal(prevState => ({
                        ...prevState,
                        email: response.data.email,
                        fullName: response.data.fullName,
                        address: response.data.address,
                    }))
                    // connesione a chat
                    const prevSocket = io('http://192.168.1.7:3000', {
                        auth: {
                            username: response.data.email,
                        }
                    });
                    setSocket(prevSocket);
                }
            }).catch((e) => {
                console.log(e);
            })
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View
            style={styles.container}>
            {hideAddress === false &&
                <>
                    <AddressComponent />
                    <Image
                        style={styles.imagePlumbers}
                        source={require('../../assets/plumbers.jpg')}
                    />
                </>
            }
            <View style={{ alignItems: 'center', flex: 1 }}>
                {hideAddress &&
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <Text style={{ marginBottom: 20, fontSize: 20, color: 'black' }}>Di cosa hai bisogno?</Text>
                    </View>
                }
                <TextInput
                    placeholderTextColor="gray"
                    underlineColorAndroid="white"
                    style={styles.inputSearch}
                    placeholder={hideAddress ? 'Es: Avvocato ' : 'digita una professione'}
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
            {/* <Image
                style={styles.imageConnectionWorkers}
                source={require('../../assets/connectionWorker2.png')}
            /> */}
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
        height: '20%',
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
        marginTop: '10@s'

    },
    buttonSearch: {
        marginTop: '18@s',
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