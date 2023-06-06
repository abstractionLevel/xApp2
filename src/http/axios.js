import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { navigationRef } from '../utils/navigationRef';

const logout = async () => {
    try {
        await AsyncStorage.removeItem('logged');
        navigationRef.current.navigate("Home",{ logout: "true" });
    } catch (error) {
        console.log(error);
    }
};

// Configura l'interceptor per le risposte delle chiamate API
const configureResponseInterceptor = () => {
    axios.interceptors.response.use(
        (response) =>  response,
        (error) => {
            if (error.response && error.response.status === 403) {
                console.log("dovrebbe disconnettersi")
                logout();
            }
            return Promise.reject(error);
        }
    );
};

// Configura l'interceptor prima di utilizzare le chiamate API
configureResponseInterceptor();

// Esporta l'istanza di axios configurata
export default axios;
