import React , {useState,useEffect } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Button,
    AsyncStorage
} from 'react-native';
import services from '../services';
import { ScaledSheet } from 'react-native-size-matters';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state,setState] = useState({})


    const storeJwt = async (jwt) => {
        try {
          await AsyncStorage.setItem("token",jwt);
        } catch (error) {
          console.log(error)
        }
      };


    const saveForm = () => {
        const payload = {username:email,password:password}
        services.login(payload).then(response=>{
            if(response) {
                storeJwt(response.accessToken)
            }
        })
    }



    return (
        <View style={styles.container}>
                <Text style={styles.title}>Benvenuto</Text>
                <View style={styles.containerForm}>
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder={'Username'}
                        style={styles.inputText}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.inputText}
                    />
                    <TouchableOpacity 
                        style={styles.loginBtn}
                        onPress={saveForm}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
            </View>
      </View>
    );
}

const blue = '#1d4e89';

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
        borderWidth: 0.60,
        color: 'black',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        marginTop: '10@s',
        borderColor: 'orange'

    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },
    
});

export default  Login;