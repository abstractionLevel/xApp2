import axios from 'axios'
import { AsyncStorage } from 'react-native';


const localhost = "http://192.168.1.18:5000/api/"


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

const signIn = payload => {
    return axios
        .post(localhost + 'signIn', payload, headers)
        .then(response => {
            return response.data
        })
}

const signUp = payload => {
    return axios.post(localhost + 'signUp', payload, headers)
        .then(response => {
            return response
        })
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



export default {
    signIn,
    signUp,
    findWorkers,
    findWorkerById,
    getReviewOfWorkerById,
    doReview,
    followWorker,
    deleteFollowedWorker,
    fetchUserFollowedWorker 
}
