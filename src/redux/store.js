import { createStore, combineReducers} from "redux";

export const updateUser = (user) => ({
    type:'UPDATE_USER',
    payload: user,
});

export const updateWorker = (worker) => ({
    type:'UPDATE_WORKER',
    payload: worker,
});

export const connectedToChat = (socket) => ({
    type: "CONNECTED",
    payload: socket,
})


const workerReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_WORKER':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const chatReducer = (state = {}, action) => {
    switch(action.type) {
        case 'CONNECTED':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user:userReducer,
    worker:workerReducer,
    chat:chatReducer,
})

const store = createStore(rootReducer);

export default store;
