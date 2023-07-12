import { createStore, combineReducers } from "redux";

export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    payload: user,
});

export const updateWorker = (worker) => ({
    type: 'UPDATE_WORKER',
    payload: worker,
});

export const connectedToChat = (socket) => ({
    type: "CONNECTED",
    payload: socket,
})

const workerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_WORKER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const chatReducer = (state = {}, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'CONNECTED':
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
    worker: workerReducer,
    socket: chatReducer,
})

const store = createStore(rootReducer);

export default store;
