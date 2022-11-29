import React, {useState, useEffect} from 'react'
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
} from 'react-native'
import services from '../services'
import {ScaledSheet} from 'react-native-size-matters'
import {useNavigation} from '@react-navigation/native'
import {useGlobalContext} from '../../context'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState({})

  const navigation = useNavigation()
  const {addTokenAuth} = useGlobalContext()

  const login = () => {
    const payload = {username: email, password: password}
    services.login(payload).then(response => {
      if (response) {
        addTokenAuth(response.accessToken),
          navigation.navigate('Home', {logout: false})
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto</Text>
      <View style={styles.containerForm}>
        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder={'Username'}
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
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        
      </View>
	  <View style={styles.links}>
          <TouchableOpacity
            style={styles.buttonRouteR}
            onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.buttonTexRoute}>Password Dimenticata</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRouteL}
            onPress={() => navigation.navigate("SignUp")}>
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
	alignItem:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
	margin:  50,
	marginTop: -5
  },
  buttonRouteR: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
	fontSize: 40
  },
  buttonRouteL: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonTexRoute: {
	fontSize: 17,
  }
})

export default Login
