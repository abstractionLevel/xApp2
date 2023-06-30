import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native'
import services from '../services'
import { ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import Url from '../utils/Urls';
import { EventEmitter } from 'events';
import AppContext from '../context/appContext';

const Login = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [stateError, setStateError] = useState({
        emailErr: false,
        passError: false
    })

    const { setAuth } = useContext(AppContext);
    const route = useRoute();
    const navigation = useNavigation()

    const isBlank = (val) => {
        if (!val.trim()) {
            return "campo obbligatorio"
        }
        return null
    }

    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('logged', token);
        } catch (error) {
            console.log('Errore nel salvataggio del token:', error);
        }
    };

    const savePrincipal = async (user) => {
        try {
            await AsyncStorage.setItem('principal', JSON.stringify(user));
        } catch (error) {
            console.log('Errore nel savlare il principal ', error);
        }
    }

    const login = () => {
        if (!email.trim() || !password.trim()) {
            setStateError({ ...stateError, emailErr: isBlank(email), passError: isBlank(password) })
        } else {
            const payload = { email: email, password: password }
            axios.post(Url.login, payload)
                .then(response => {
                    if (response) {
                        saveToken(response.data.token);
                        savePrincipal(response.data);
                        setAuth(true);
                        navigation.navigate('Home');
                    }
                }).catch((error) => {
                    console.log(error)
                })
            // services.signIn(payload).then(response => {
            //     if (response) {
            //         saveToken(response)
            //         navigation.navigate('Home', { logout: false })
            //     }
            // }).catch((error) => {
            //     console.log(error)

            // })
        }
    }

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'registration done',
        });
    }

    useEffect(() => {
        if (route.params?.isRegistered) {
            showToast();
        }
    })

    return (
        <View style={styles.container}>
            <Toast />
            <View style={styles.containerForm}>
                <View style={{ width: '90%', marginTop: 10 }}>
                    <Text style={styles.label}>
                        Email
                    </Text>
                </View>
                <TextInput
                    value={email}
                    onChangeText={email => {
                        setEmail(email)
                        setStateError({ ...stateError, emailErr: null })
                    }}
                    style={styles.inputText}
                />
                {stateError.emailErr && <Text style={styles.errorMessage}>{stateError.emailErr}</Text>}
                <View style={{ width: '90%', marginTop: 10 }}>
                    <Text style={styles.label}>
                        Password
                    </Text>
                </View>
                <TextInput
                    value={password}
                    onChangeText={password => {
                        setPassword(password)
                        setStateError({ ...stateError, passError: null })
                    }}
                    secureTextEntry={true}
                    style={styles.inputText}
                />
                {stateError.passError && <Text style={styles.errorMessage}>{stateError.passError}</Text>}
                <TouchableOpacity style={styles.loginBtn} onPress={login}>
                    <Text style={{ color: 'white' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.links}>
                <TouchableOpacity
                    style={styles.buttonRouteR}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonTexRoute}>
                        Password dimenticata?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonRouteL}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonTexRoute}>Registrati</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const blue = '#1d4e89'

// define your styles
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    containerForm: {
        alignItems: 'center',
    },
    title: {
        marginLeft: '10%',
    },
    inputText: {
        width: '90%',
        height: '50@s',
        fontSize: '18@s',
        borderRadius: 6,
        borderWidth: 0.6,
        color: 'black',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        marginTop: '10@s',
        borderColor: 'black',
    },
    loginBtn: {
        width: '90%',
        backgroundColor: '#0088ff',
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    links: {
        alignItem: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'black',
        margin: 20,
        marginTop: -5,
    },
    buttonRouteR: {
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        fontSize: 40,
    },
    buttonRouteL: {
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonTexRoute: {
        fontSize: 17,
    },
    errorMessage: {
        color: 'red',
    },
    label: {
        fontWeight: '600',
        color: 'black',
    },
})

export default Login
