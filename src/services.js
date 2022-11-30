import axios from 'axios';


const headers = {
    'Content-Type': 'text/json',
    "Access-Control-Allow-Origin": "*",
}

const  login = (payload) => {
    return axios.post("http://192.168.1.5:5000/api/login",payload,headers)
        .then((response) => {
            return response.data;
        })
      
}

const signUp = (payload) => {
    return axios.post("http://192.168.1.5:5000/api/signUp",payload,headers)
        .then((response) => {
            return response;
        })
        
}
export default {
    login,
    signUp,
}