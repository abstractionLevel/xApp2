import axios from 'axios'

const headers = {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
}

const login = payload => {
    return axios
        .post('http://192.168.1.5:5000/api/login', payload, headers)
        .then(response => {
            return response.data
        })
}

const signUp = payload => {
    return axios
        .post('http://192.168.1.5:5000/api/signUp', payload, headers)
        .then(response => {
            return response
        })
}

const findWorkers = payload => {
    return axios
        .post('http://192.168.1.5:5000/api/worker', payload, headers)
        .then(response => {
            return response
        })
}

const findWorkerById = (id) => {
    return axios.get('http://192.168.1.5:5000/api/worker/' + id, headers)
        .then(response => {
            return response
        })
}

const getReviewOfWorkerById = (id) => {
    return axios.get("http://192.168.1.5:5000/api/worker/"+id+"/review", headers)
        .then(response => {
            return response
        })
}
export default {
    login,
    signUp,
    findWorkers,
    findWorkerById,
    getReviewOfWorkerById
}
