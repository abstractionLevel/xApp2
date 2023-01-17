import axios from 'axios'


const localhost = "http://192.168.1.18:5000/api/"

const headers = {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
}

const signIn = payload => {
    return axios
        .post(localhost + 'signIn', payload, headers)
        .then(response => {
            return response.data
        })
}

const signUp = payload => { 
    return axios.post(localhost+'signUp', payload, headers)
        .then(response => {
            return response
        })
}

const findWorkers = payload => {
    return axios
        .post(localhost + '/worker', payload, headers)
        .then(response => {
            return response
        })
}

const findWorkerById = (id) => {
    return axios.get(localhost+'/worker/' + id, headers)
        .then(response => {
            return response
        })
}

const getReviewOfWorkerById = (id) => {
    return axios.get(localhost+"/worker/" + id + "/review", headers)
        .then(response => {
            return response
        })
}

const doReview = (payload) => {
    return axios.post(localhost+"/worker/" + payload.workerId + "/review", payload, headers)
        .then(response => {
            return response
        })
}

const followWorker = (payload) => {
    return axios.post(localhost+"/worker/follow",payload,headers)
        .then(response=>{
            return response
        })
}

const findFollowedWorker = (workerId,userId) => {
    return axios.get(localhost+"/worker/saved/"+workerId+"/"+userId,headers)
        .then(response=>{
            return response
        })
}

const deleteFollowedWorker = (payload) => {
    return axios.post(localhost+"/worker/deleteFollowedWorker",payload,headers)
        .then(response=>{
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
    findFollowedWorker,
    deleteFollowedWorker
}
