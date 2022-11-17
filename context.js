import React,{useState,useContext,useEffect} from 'react';
import {AsyncStorage} from 'react-native';

const AppContext = React.createContext();

export function AppProvider({children})  {

    const [auth,setAuth] = useState(false)

    const retrieveTokenAuth = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            console.log("retrieveTokenAuth ", value)
            setAuth(value)
            
        } catch (error) {
            console.log(error)
        }
    };

    const removeTokenAuth = async () => {
        try {
            const value = await AsyncStorage.removeItem('token')
            setAuth(false)
            
        } catch (error) {
            console.log(error)
        }
    };

    const addTokenAuth = async (token) => {
        try {
            console.log("nuovo toke ", token)
            const value = await AsyncStorage.setItem("token",token)
            retrieveTokenAuth()
            
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{
        retrieveTokenAuth()
    })

    return (
        <AppContext.Provider
            value={{
                auth,
                setAuth,
                removeTokenAuth,
                retrieveTokenAuth,
                addTokenAuth,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(AppContext)
    
}