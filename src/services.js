import axios from 'axios';


const headers = {
    'Content-Type': 'text/json',
    "Access-Control-Allow-Origin": "*",
}

const  login = (payload) => {
    return axios.post("http://192.168.1.85:5000/api/login",payload,headers)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error.message);
        })
}


export default {
    login,
}