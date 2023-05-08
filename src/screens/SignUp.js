import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Button,
    AsyncStorage,
    Alert
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import services from '../services'
import axios from 'axios'
import Url from '../utils/Urls'

const SignUp = props => {

    const navigation = useNavigation()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [stateError, setStateError] = useState({
        email: null,
        password: null,
    })

    // const validateEmail = (mail) => {
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    //         return (true)
    //     }
    //     return (false)
    // }

    const validatePassword = password => {
        var rgx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (password === null) {
            return "campo obbligatorio"
        }
        else if (!rgx.test(password)) {
            console.log("password sbagliata ")
            return "la password deve contenere un carattere minuscolo,maiuscolo ,caratteri speciali e numeri"
        }
        return null
    }

    const isBlank = (val) => {
        if (val === null) {
            return "campo obbligatorio"
        }
        return null
    }

    const validateEmail = (val) => {
        let rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (val === null) {
            return "campo obbligatoriddo"
        } else if (!rgx.test(val)) {
            return "assicurati di aver inserito un email valida"
        }
        return null
    }
    const save = () => {
        if (!email || !password) {
            setStateError({ ...stateError, password: validatePassword(password), email: validateEmail(email) })
        }
        else {
            const payload = { password: password, email: email }
            const headers = {
                'Content-Type': 'text/json',
                'Access-Control-Allow-Origin': '*',
            }
            axios.post(Url.register, payload,headers)
                .then(response => {
                    if (response) {
                        navigation.navigate('Login', { isRegistered: true });
                        setPassword(null);
                        setEmail(null);
                        
                        
                    }
                }).catch((error) => {
                    console.log("Errore:" + error)
                })
        }
    }

    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <View style={styles.containerForm}>
                <TextInput
                    value={email}
                    onChangeText={email => {
                        setEmail(email)
                        setStateError({ ...stateError, email: null })
                    }}
                    placeholder={'Email'}
                    style={styles.inputText}
                />
                {stateError.email && <Text style={styles.errorMessage}>{stateError.email}</Text>}
                <TextInput
                    value={password}
                    PP
                    onChangeText={password => {
                        setPassword(password)
                        setStateError({ ...stateError, password: null })
                    }}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.inputText}
                />
                {stateError.password && <Text style={styles.errorMessage}>{stateError.password}</Text>}
                <TouchableOpacity style={styles.loginBtn} onPress={save}>
                    <Text style={styles.loginText}>REGISTRATI</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.links}>
                <TouchableOpacity
                    style={styles.buttonRouteR}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTexRoute}>Login</Text>
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
        width: '80%',
        height: '50@s',
        fontSize: '18@s',
        borderRadius: 7,
        borderWidth: 0.6,
        color: 'black',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        marginTop: '10@s',
        borderColor: 'orange',
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
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
        margin: 50,
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
    }
})

export default SignUp
