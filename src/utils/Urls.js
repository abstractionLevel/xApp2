const url = "http://192.168.1.8:5000";
const apiUser = "/api/users";
const signIn = "/api/signIn";
const signUp = "/api/signUp";
const apiJob = "/public/api/jobs";
const apiWorker = "/api/workers";
const apiMessage = "/api/messages";
const apiChat = "/api/chats";

const Url = {
    fetchUser: url + apiUser,
    updateUser: url + apiUser,
    login: url + signIn,
    register: url  + signUp,
    changePassword: url + apiUser,
    getAllJob: url + apiJob,
    worker: url + apiWorker,
    message: url + apiMessage,
    chat: url + apiChat,
}
export default Url; 