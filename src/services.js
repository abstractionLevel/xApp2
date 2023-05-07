import axios from 'axios'
import { AsyncStorage } from 'react-native';


const url = "http://192.168.1.5:8080/";
const localhost = url+"/public/api/auth";
const apiUsers = url + "/public/api/users";



let token = null

const headers = {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bear' + token
}

const getHeaders = async () => {
    const userAuth = await AsyncStorage.getItem('auth');
    const userAuthJson = JSON.parse(userAuth)
    return {
        headers: {
            'Authorization': 'Bear ' + userAuthJson.accessToken
        }
    }
}

getHeaders()

const signIn = async payload => {
    const response = await axios.post(localhost + '/authenticate', payload, headers);
    return response.data;
}

const signUp = async payload => {
    const response = await axios.post(localhost + '/register', payload, headers);
    return response;
}

const findWorkers = async payload => {
    const header = await getHeaders()
    return axios
        .post(localhost + '/workers', payload, header)
        .then(response => {
            return response
        })
}

const findWorkerById = async (id) => {
    return axios.get(localhost + '/workers/' + id, await getHeaders())
        .then(response => {
            return response
        })
}

const getReviewOfWorkerById = async (id) => {
    return axios.get(localhost + "/workers/" + id + "/review", await getHeaders())
        .then(response => {
            return response
        })
}

const doReview = (payload) => {
    return axios.post(localhost + "/workers/" + payload.workerId + "/review", payload, headers)
        .then(response => {
            return response
        })
}

const followWorker = async (payload) => {
    return axios.post(localhost + "/worker/follow", payload, await getHeaders())
        .then(response => {
            return response
        })
}



const deleteFollowedWorker = async  (id) => {
    return axios.delete(localhost + "/followedWorker/"+id, await getHeaders())
        .then(response => {
            return response
        })
}

const fetchUserFollowedWorker = async (params) => {
    return axios.get(localhost + "users/" + params.userId + "/followedWorker/" + params.workerId,await getHeaders())
        .then(response => {
            return response
        })
}

const getUserById = async (id) => {
    return axios.get(url + apiUsers + id,await getHeaders())
        .then(response => {
            return response
        })
}


export default {
    signIn,
    signUp,
    findWorkers,
    findWorkerById,
    getReviewOfWorkerById,
    doReview,
    followWorker,
    deleteFollowedWorker,
    fetchUserFollowedWorker,
    getUserById,
}
