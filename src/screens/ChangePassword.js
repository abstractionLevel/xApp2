import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import axios from '../http/axios';
import Url from '../utils/Urls';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';


//KeyboardAvoidingView : wrappare solo attorno agli input

const ChangePassword = (props) => {

    const { navigation } = props;
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: ''
    });
    const [tokenAuth, setTokenAuth] = useState(null);

    const getToken = async () => {
        try {
            const logged = await AsyncStorage.getItem('logged');
            setTokenAuth(logged)
        } catch (error) {
            console.log(error)
        }
    }

    const showRegistrationAlert = () => {
        showMessage({
            message: 'Password aggiornata',
            type: 'success',
            duration: 3000,
            autoHide: true,
        });
      };

    useEffect(() => {
        getToken();
    }, []);


    const salva = () => {
        const { currentPassword, newPassword, confirmPassword } = passwords;
        const payload = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswords({ ...passwords, error: 'Tutti i campi password devono essere compilati.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswords({ ...passwords, error: 'Le nuove password non corrispondono.' });
            return;
        }

        axios.put(Url.changePassword + "/" + tokenAuth + "/password", payload, {
            headers: {
                'Authorization': 'Bearer ' + tokenAuth
            }
        })
        .then(response => {
            showRegistrationAlert();
            navigation.navigate('Account');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Password Attuale</Text>
                <TextInput
                    style={styles.textInput}
                    value={passwords.currentPassword}
                    onChangeText={(val) => setPasswords({ ...passwords, currentPassword: val })}
                />
                <Text style={styles.label}>Nuova Password</Text>
                <TextInput
                    style={styles.textInput}
                    value={passwords.newPassword}
                    onChangeText={(val) => setPasswords({ ...passwords, newPassword: val })}
                />
                <Text style={styles.label}>Conferma Password</Text>
                <TextInput
                    style={styles.textInput}
                    value={passwords.confirmPassword}
                    onChangeText={(val) => setPasswords({ ...passwords, confirmPassword: val })}
                />
                <Text style={styles.label}>{passwords.error}</Text>
                <TouchableOpacity
                    style={{
                        marginTop: 30,
                        backgroundColor: 'orange',
                        width: '80%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,

                    }}
                    onPress={salva}>
                    <Text style={{
                        color: 'white',
                        fontSize: 22
                    }} >Save</Text>
                </TouchableOpacity>
            </ScrollView>
            <FlashMessage position="top" />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50,
        padding: 24,
    },
    textInput: {
        width: '100%',
        height: 50,
        fontSize: 18,
        borderBottomWidth: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    label: {
        marginTop: 20,
        fontWeight: '500',
        letterSpacing: 2,
    },
});
export default ChangePassword;