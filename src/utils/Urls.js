const url = "http://192.168.1.13:8080";
const apiUser = "/api/users";
const auth = "/public/api/auth";
const apiJob = "/public/api/jobs";
const apiWorker = "/api/workers";
const apiMessage = "/api/messages";
const apiChat = "/api/chats";

const Url = {
    fetchUser: url + apiUser,
    saveUser: url + apiUser,
    login: url + auth + "/authenticate",
    register: url + auth + "/register",
    changePassword: url + apiUser,
    getAllJob: url + apiJob,
    worker: url + apiWorker,
    message: url + apiMessage,
    chat: url + apiChat,
}
export default Url; 