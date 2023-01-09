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

const SignUp = props => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [state, setState] = useState({})

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    const validatePassword  = password => {
        var re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if(re.test(password)) {
            return true
        }
        return false
    }

    const save = () => {
        if (!validateEmail(email)) {
            Alert.alert("email non valida")
        }
        if(!validatePassword(password)) {
            Alert.alert("la password deve contenere un carattere minuscolo,maiuscolo ,caratteri speciali e numeri ")
        }
        if (!name.trim() || !password.trim() || !email.trim()) {
            Alert.alert("I campi sono obbligatori")
        }
        
        else {
            const payload = { username: name, password: password, email: email }
            console.log(":res ", payload)
            services.signUp(payload).then(response => {
                console.log(":res ", response)
                if (response) {
                    navigation.navigate('Login')
                }
            }).catch(err => {
                if (err.response.status == 409) {
                    Alert.alert('email esistente')
                }

            })
        }

    }

    useEffect(() => { }, [])

    return (
        <View style={styles.container}>
            {errMessage && <Text>{errMessage}</Text>}
            <Text style={styles.title}>Benvenuto</Text>
            <View style={styles.containerForm}>
                <TextInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    placeholder={'Email'}
                    style={styles.inputText}
                />
                <TextInput
                    value={name}
                    onChangeText={name => setName(name)}
                    placeholder={'name'}
                    style={styles.inputText}
                />
                <TextInput
                    value={password}
                    PP
                    onChangeText={password => setPassword(password)}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.inputText}
                />
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
})

export default SignUp
