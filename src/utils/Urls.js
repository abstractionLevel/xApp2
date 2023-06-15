const url = "http://192.168.1.7:8080";
const apiUser = "/api/users";
const auth = "/public/api/auth";

const Url = {
    fetchUser: url + apiUser,
    saveUser: url + apiUser,
    login: url + auth + "/authenticate",
    register: url + auth + "/register",
    changePassword: url + apiUser  
}
export default Url; 