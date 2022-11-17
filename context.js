import React,{useState,useContext,useEffect} from 'react';
import {AsyncStorage} from 'react-native';

const AppContext = React.createContext();

export function AppProvider({children})  {

    const [auth,setAuth] = useState(null)

    const retrieveTokenAuth = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            setAuth(value)
            
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
                setAuth
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(AppContext)
    
}